import type { Metadata } from "next";
import { getAllBlogPosts, blogCategories } from "@/lib/blog";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BlogList } from "@/components/shared/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "무엇을 공부하고 어떻게 생각하는지 기록합니다.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <Container className="py-20">
      <SectionHeading eyebrow="BLOG" title="어떻게 생각하고 공부하는가" />
      <BlogList posts={posts} categories={blogCategories} />
    </Container>
  );
}
