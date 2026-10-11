import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { RowList } from "@/components/shared/RowList";
import { Section } from "./Section";

export function RecentBlogPosts({ index }: { index: number }) {
  return (
    <Section id="blog" index={index} title="Writing">
      <RowList
        empty=""
        rows={getAllBlogPosts()
          .slice(0, 3)
          .map((post) => ({
            href: `/blog/${post.slug}`,
            meta: post.date,
            title: post.title,
            label: post.category,
            body: post.excerpt,
          }))}
      />
      <Link href="/blog" className="mt-12 inline-block text-[15px] underline underline-offset-4 hover:text-muted">
        전체 글 →
      </Link>
    </Section>
  );
}
