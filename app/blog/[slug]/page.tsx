import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { Container } from "@/components/shared/Container";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.frontmatter.title, description: post.frontmatter.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="max-w-3xl py-20">
      <p className="font-mono text-sm tracking-wider text-accent">
        {post.frontmatter.date} · {post.frontmatter.category}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
        {post.frontmatter.title}
      </h1>
      <div className="prose-blog mt-10">
        <MDXRemote source={post.content} />
      </div>
    </Container>
  );
}
