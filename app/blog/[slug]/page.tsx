import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { Container } from "@/components/shared/Container";
import { DetailHeader } from "@/components/shared/Detail";
import { serif } from "@/lib/fonts";

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
    <Container className="pb-20 sm:pb-28">
      <article className={`${serif.className} break-keep pt-20 sm:pt-28`}>
        <DetailHeader
          back={{ href: "/blog", label: "Blog" }}
          meta={`${post.frontmatter.date} · ${post.frontmatter.category}`}
          title={post.frontmatter.title}
          lead={post.frontmatter.excerpt}
        />
        <div className="prose-blog mt-16 max-w-3xl sm:mt-20">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </Container>
  );
}
