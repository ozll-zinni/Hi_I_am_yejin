"use client";

import { useMemo, useState } from "react";
import type { BlogPostMeta } from "@/lib/blog";
import { RowList } from "./RowList";

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
    return <p className="text-[17px] text-muted">아직 작성된 글이 없습니다. 곧 찾아오겠습니다.</p>;
  }

  return (
    <div>
      <div className="mb-16 flex flex-col gap-6 text-[15px]">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          aria-label="Search posts"
          className="w-full max-w-xs border-b border-border bg-transparent py-2 outline-none placeholder:text-muted focus:border-foreground"
        />
        <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter by category">
          {["ALL", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={category === c ? "underline underline-offset-4" : "text-muted hover:text-foreground"}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <RowList
        empty="검색 결과가 없습니다."
        rows={filtered.map((post) => ({
          href: `/blog/${post.slug}`,
          meta: post.date,
          title: post.title,
          label: post.category,
          body: post.excerpt,
        }))}
      />
    </div>
  );
}
