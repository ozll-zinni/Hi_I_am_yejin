import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPlaygroundItems, getPlaygroundItemBySlug } from "@/content/playground";
import { Container } from "@/components/shared/Container";
import { Tag } from "@/components/shared/Tag";

export function generateStaticParams() {
  return getAllPlaygroundItems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPlaygroundItemBySlug(slug);
  if (!item) return {};
  return { title: item.title, description: item.description };
}

export default async function PlaygroundDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPlaygroundItemBySlug(slug);
  if (!item) notFound();

  return (
    <Container className="max-w-3xl py-20">
      <span className="w-fit rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
        {item.category}
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{item.title}</h1>
      <p className="mt-4 text-lg text-muted">{item.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        {item.github && (
          <a href={item.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">
            GitHub →
          </a>
        )}
        {item.demo && (
          <a href={item.demo} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">
            Live Demo →
          </a>
        )}
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8">
        <h2 className="font-mono text-sm tracking-wider text-muted">NOTES</h2>
        {item.notes.map((note, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/90">
            {note}
          </p>
        ))}
      </div>
    </Container>
  );
}
