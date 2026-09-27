"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { ComingSoon } from "./ComingSoon";

const FILTERS: (ProjectCategory | "ALL")[] = ["ALL", "WEB", "FINTECH", "SIDE PROJECT", "WORK"];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const filtered = useMemo(
    () => (filter === "ALL" ? projects : projects.filter((p) => p.category.includes(filter))),
    [projects, filter]
  );

  if (projects.length === 0) {
    return <ComingSoon message="공개할 프로젝트를 준비하고 있습니다." />;
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">해당 카테고리의 프로젝트가 아직 없습니다.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
