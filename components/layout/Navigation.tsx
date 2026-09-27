"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

// Home is a one-page scroll; these ids map a visible section back to a nav label.
const SECTION_TO_NAV_LABEL: Record<string, string> = {
  projects: "WORK",
  blog: "BLOG",
};

export function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = Object.keys(SECTION_TO_NAV_LABEL);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === "/" ? SECTION_TO_NAV_LABEL[activeSection ?? ""] === labelFor(href) : pathname.startsWith(href);

  function labelFor(href: string) {
    return nav.find((item) => item.href === href)?.label;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="font-mono text-lg font-semibold tracking-tight">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive(item.href) ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center sm:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-foreground transition-transform ${
                mobileOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-5 bg-foreground transition-opacity ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-foreground transition-transform ${
                mobileOpen ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="flex flex-col gap-1 border-t border-border px-6 py-4 sm:hidden"
          aria-label="Primary mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`py-2 text-sm font-medium ${
                isActive(item.href) ? "text-accent" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
