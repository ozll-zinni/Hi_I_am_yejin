import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { Container } from "@/components/shared/Container";
import { serif } from "@/lib/fonts";

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

  const links = [
    project.github && { label: "GitHub", href: project.github },
    project.demo && { label: "Live Demo", href: project.demo },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
  const sitesByTheme = Object.entries(Object.groupBy(project.sites ?? [], (site) => site.theme));

  return (
    <Container className="pb-20 sm:pb-28">
      <article className={`${serif.className} break-keep pt-20 sm:pt-28`}>
        {/* Mirrors the home Section header rule. */}
        <div className="mb-12 flex items-baseline justify-between border-t border-foreground pt-3 text-xs sm:mb-16 sm:text-[15px]">
          <Link href="/work" className="hover:text-muted">
            ← Work
          </Link>
          <span className="tabular-nums">{project.period}</span>
        </div>

        <h1 className="text-4xl leading-tight tracking-tight sm:text-6xl">{project.name}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed tracking-tight sm:text-[26px]">{project.summary}</p>

        <dl className="mt-16 grid gap-8 text-[15px] sm:mt-20 sm:grid-cols-3">
          <div className="border-t border-border pt-3">
            <dt className="text-muted">Category</dt>
            <dd className="mt-2 leading-relaxed">{project.category.join(", ")}</dd>
          </div>
          <div className="border-t border-border pt-3">
            <dt className="text-muted">Tech Stack</dt>
            <dd className="mt-2 leading-relaxed">{project.stack.join(", ")}</dd>
          </div>
          {links.length > 0 && (
            <div className="border-t border-border pt-3">
              <dt className="text-muted">Links</dt>
              <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                {links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-muted">
                    {link.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-20 sm:mt-28">
          {sitesByTheme.length > 0 && (
            <section className="grid gap-4 border-t border-border py-10 sm:grid-cols-[11rem_1fr] sm:gap-8">
              <h2 className="text-[15px] text-muted">Sites</h2>
              <dl className="flex flex-col gap-6 text-[17px] leading-relaxed">
                {sitesByTheme.map(([theme, sites]) => (
                  <div key={theme}>
                    <dt className="text-[15px] text-muted">{theme}</dt>
                    <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-1">
                      {sites?.map((site) => (
                        <a key={site.url} href={site.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-muted">
                          {site.name} ↗
                        </a>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {project.caseStudy.map((section, i) => (
            <section key={section.heading} className="border-t border-border py-10">
              <p className="text-[15px] tabular-nums text-muted">({String(i + 1).padStart(2, "0")})</p>
              <h2 className="mt-2 text-2xl tracking-tight sm:text-3xl">{section.heading}</h2>
              <div className="mt-8 flex flex-col gap-8">
                {(
                  [
                    ["문제", section.problem],
                    ["해결방법", section.solution],
                    ["성과", section.result],
                  ] as const
                ).map(([label, points]) => (
                  <div key={label} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
                    <h3 className="text-[15px] text-muted">{label}</h3>
                    <Points points={points} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="flex flex-col gap-3 text-[17px] leading-relaxed">
      {points.map((point, i) => (
        <li key={i}>{inline(point)}</li>
      ))}
    </ul>
  );
}

// Just enough markdown for case-study copy: `code`.
function inline(text: string) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") ? (
      <code key={i} className="rounded bg-foreground/5 px-1 font-mono text-[0.85em]">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  );
}
