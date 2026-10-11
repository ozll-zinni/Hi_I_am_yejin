import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { Container } from "@/components/shared/Container";
import { DetailHeader, ExternalLinks, MetaGrid, repoLinks } from "@/components/shared/Detail";
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

  const links = repoLinks(project);
  const sitesByTheme = Object.entries(Object.groupBy(project.sites ?? [], (site) => site.theme));

  return (
    <Container className="pb-20 sm:pb-28">
      <article className={`${serif.className} break-keep pt-20 sm:pt-28`}>
        <DetailHeader back={{ href: "/work", label: "Work" }} meta={project.period} title={project.name} lead={project.summary} />
        <MetaGrid
          items={[
            { label: "Category", content: project.category.join(", ") },
            { label: "Tech Stack", content: project.stack.join(", ") },
            ...(links.length > 0 ? [{ label: "Links", content: <ExternalLinks links={links} /> }] : []),
          ]}
        />

        <div className="mt-20 sm:mt-28">
          {sitesByTheme.length > 0 && (
            <section className="grid gap-4 border-t border-border py-10 sm:grid-cols-[11rem_1fr] sm:gap-8">
              <h2 className="text-[15px] text-muted">Sites</h2>
              <dl className="flex flex-col gap-6 text-[17px] leading-relaxed">
                {sitesByTheme.map(([theme, sites]) => (
                  <div key={theme}>
                    <dt className="text-[15px] text-muted">{theme}</dt>
                    <dd className="mt-1">
                      <ExternalLinks links={(sites ?? []).map((site) => ({ label: site.name, href: site.url }))} />
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
