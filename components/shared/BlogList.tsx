"use client";

import { useMemo, useState } from "react";
import type { BlogPostMeta } from "@/lib/blog";
import { BlogCard } from "./BlogCard";
import { ComingSoon } from "./ComingSoon";

export function BlogList({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "ALL" || post.category === category;
      const matchesQuery =
        query.trim() === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  if (posts.length === 0) {
    return <ComingSoon message="아직 작성된 글이 없습니다. 곧 찾아오겠습니다." />;
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          aria-label="Search posts"
          className="w-full max-w-xs rounded-[--radius-base] border border-border px-4 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["ALL", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              category === c
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">검색 결과가 없습니다.</p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
