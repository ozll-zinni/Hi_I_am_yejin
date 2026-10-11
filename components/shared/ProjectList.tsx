import Link from "next/link";
import type { Project } from "@/content/projects";

// Same row grid as the home Experience list, so Work reads as part of the same page system.
export function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="text-[17px] text-muted">공개할 프로젝트를 준비하고 있습니다.</p>;
  }

  return (
    <ol>
      {projects.map((project, i) => (
        <li key={project.slug} className="border-t border-border py-10 first:border-t-0 first:pt-0">
          <Link href={`/work/${project.slug}`} className="group grid gap-4 sm:grid-cols-[11rem_1fr_auto] sm:gap-8">
            <p className="text-[15px] tabular-nums text-muted">
              ({String(i + 1).padStart(2, "0")})
              <br />
              {project.period}
            </p>
            <div>
              <h3 className="text-2xl tracking-tight underline-offset-4 group-hover:underline sm:text-3xl">
                {project.name}
                <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </h3>
              <p className="mt-1 text-[15px] text-muted">{project.category.join(" · ")}</p>
              <p className="mt-6 text-[17px] leading-relaxed">{project.summary}</p>
            </div>
            <p className="text-[15px] text-muted sm:text-right">{project.stack.join(" · ")}</p>
          </Link>
        </li>
      ))}
    </ol>
  );
}
