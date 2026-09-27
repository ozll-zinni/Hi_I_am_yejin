import Link from "next/link";
import type { Project } from "@/content/projects";
import { Tag } from "./Tag";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[--radius-base] border border-border transition-colors hover:border-foreground/30">
      <div className="flex aspect-[16/10] items-center justify-center bg-foreground/[0.03] font-mono text-sm text-muted">
        {project.name}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="mb-2 font-mono text-xs tracking-wider text-accent">
            PROJECT {String(index).padStart(2, "0")} · {project.period}
          </p>
          <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-2 text-sm text-muted">{project.summary}</p>
        </div>
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            Case Study
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
                GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="hover:text-foreground">
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
