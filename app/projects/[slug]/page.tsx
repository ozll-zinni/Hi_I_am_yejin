import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { Container } from "@/components/shared/Container";
import { Tag } from "@/components/shared/Tag";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Container className="py-20">
      <p className="font-mono text-sm tracking-wider text-accent">{project.period}</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

      {project.stack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}

      {(project.github || project.demo) && (
        <div className="mt-6 flex flex-wrap gap-6">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">
              GitHub →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">
              Live Demo →
            </a>
          )}
        </div>
      )}

      <div className="mt-16 flex flex-col divide-y divide-border border-t border-border">
        {project.caseStudy.map((section) => (
          <section key={section.heading} className="grid gap-3 py-10 sm:grid-cols-[200px_1fr] sm:gap-8">
            <h2 className="font-mono text-sm tracking-wider text-muted">{section.heading}</h2>
            <div className="flex flex-col gap-2 text-base leading-relaxed text-foreground/90">
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
