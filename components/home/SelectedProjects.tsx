import Link from "next/link";
import { getFeaturedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section } from "./Section";

export function SelectedProjects({ index }: { index: number }) {
  return (
    <Section id="projects" index={index} title="Work">
      <div className="grid gap-6 sm:grid-cols-2">
        {getFeaturedProjects().map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i + 1} />
        ))}
      </div>
      <Link href="/projects" className="mt-12 inline-block text-[15px] underline underline-offset-4 hover:text-muted">
        전체 프로젝트 →
      </Link>
    </Section>
  );
}
