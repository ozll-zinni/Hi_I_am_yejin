import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export const blogCategories = [
  "Frontend",
  "React",
  "JavaScript",
  "Next.js",
  "Algorithm",
  "Git",
  "Career",
  "Fintech",
] as const;

export type BlogFrontmatter = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

export type BlogPostMeta = BlogFrontmatter & { slug: string };

function readSlugs() {
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return readSlugs()
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return { ...(data as BlogFrontmatter), slug: file.replace(/\.mdx$/, "") };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as BlogFrontmatter, content, slug };
}
