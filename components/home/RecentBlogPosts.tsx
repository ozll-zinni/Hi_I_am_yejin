import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/shared/BlogCard";
import { Section } from "./Section";

export function RecentBlogPosts({ index }: { index: number }) {
  return (
    <Section id="blog" index={index} title="Writing">
      <div className="flex flex-col">
        {getAllBlogPosts()
          .slice(0, 3)
          .map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
      </div>
      <Link href="/blog" className="mt-12 inline-block text-[15px] underline underline-offset-4 hover:text-muted">
        전체 글 →
      </Link>
    </Section>
  );
}
