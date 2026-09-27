import Link from "next/link";
import { getFeaturedProjects } from "@/content/projects";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ComingSoon } from "@/components/shared/ComingSoon";

export function SelectedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="projects" className="scroll-mt-16 py-20">
      <SectionHeading eyebrow="WORK" title="어떤 프로젝트를 했는가" />
      {projects.length === 0 ? (
        <ComingSoon message="공개할 프로젝트를 준비하고 있습니다." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      )}
      <Link
        href="/projects"
        className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-accent"
      >
        View all projects →
      </Link>
    </section>
  );
}
