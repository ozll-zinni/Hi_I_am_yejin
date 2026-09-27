import Link from "next/link";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20">
      <p className="font-mono text-sm tracking-wider text-accent">{site.role}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
        {site.name}
      </h1>
      <p className="mt-6 max-w-xl whitespace-pre-line text-lg text-muted sm:text-xl">
        {site.tagline}
      </p>
      <p className="mt-4 font-mono text-sm text-muted">
        {site.heroStack.join(" · ")}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/projects"
          className="rounded-[--radius-base] bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          View Projects
        </Link>
        <a
          href={site.links.resume}
          className="rounded-[--radius-base] border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40"
        >
          View Resume
        </a>
        <a href={site.links.github} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-foreground">
          GitHub
        </a>
        <a href={site.links.email} className="text-sm text-muted hover:text-foreground">
          Email
        </a>
      </div>
    </section>
  );
}
