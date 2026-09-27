import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-border py-6 first:pt-0 last:border-none"
    >
      <p className="font-mono text-xs tracking-wider text-accent">
        {post.date} · {post.category}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
    </Link>
  );
}
