import type { ReactNode } from "react";
import Link from "next/link";

// Detail-page header: the Section hairline rule with a back link, then the title and lead.
export function DetailHeader({
  back,
  meta,
  title,
  lead,
}: {
  back: { href: string; label: string };
  meta: string;
  title: string;
  lead?: string;
}) {
  return (
    <>
      <div className="mb-12 flex items-baseline justify-between border-t border-foreground pt-3 text-xs sm:mb-16 sm:text-[15px]">
        <Link href={back.href} className="hover:text-muted">
          ← {back.label}
        </Link>
        <span className="tabular-nums">{meta}</span>
      </div>
      <h1 className="text-4xl leading-tight tracking-tight sm:text-6xl">{title}</h1>
      {lead && <p className="mt-6 max-w-3xl text-xl leading-relaxed tracking-tight sm:text-[26px]">{lead}</p>}
    </>
  );
}

// The About-style hairline facts grid (Category / Tech Stack / Links).
export function MetaGrid({ items }: { items: { label: string; content: ReactNode }[] }) {
  return (
    <dl className="mt-16 grid gap-8 text-[15px] sm:mt-20 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="border-t border-border pt-3">
          <dt className="text-muted">{item.label}</dt>
          <dd className="mt-2 leading-relaxed">{item.content}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ExternalLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <span className="flex flex-wrap gap-x-6 gap-y-1">
      {links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-muted">
          {link.label} ↗
        </a>
      ))}
    </span>
  );
}

// Builds the Links entry from optional github/demo URLs; empty when neither is set.
export function repoLinks({ github, demo }: { github?: string; demo?: string }) {
  return [
    github && { label: "GitHub", href: github },
    demo && { label: "Live Demo", href: demo },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
}
