import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 {site.name}</p>
        <div className="flex gap-4">
          <a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href={site.links.email} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
