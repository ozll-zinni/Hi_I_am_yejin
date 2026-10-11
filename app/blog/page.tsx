import type { Metadata } from "next";
import { getAllBlogPosts, blogCategories } from "@/lib/blog";
import { ListPage } from "@/components/shared/ListPage";
import { BlogList } from "@/components/shared/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "무엇을 공부하고 어떻게 생각하는지 기록합니다.",
};

export default function BlogPage() {
  return (
    <ListPage title="Blog" lead="무엇을 공부하고 어떻게 생각하는지 기록합니다.">
      <BlogList posts={getAllBlogPosts()} categories={blogCategories} />
    </ListPage>
  );
}
