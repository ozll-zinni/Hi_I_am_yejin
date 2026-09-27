import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BlogCard } from "@/components/shared/BlogCard";
import { ComingSoon } from "@/components/shared/ComingSoon";

export function RecentBlogPosts() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section id="blog" className="scroll-mt-16 py-20">
      <SectionHeading
        eyebrow="BLOG"
        title="어떤 개발 경험과 관심사를 가지고 있는가"
      />
      {posts.length === 0 ? (
        <ComingSoon message="곧 글을 작성해 올릴 예정입니다." />
      ) : (
        <div className="flex flex-col">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      <Link href="/blog" className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-accent">
        View all posts →
      </Link>
    </section>
  );
}
