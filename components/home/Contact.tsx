import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 py-24">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
        Let&apos;s build something.
      </h2>
      <p className="mt-4 max-w-lg text-lg text-muted">
        Frontend development, interesting ideas, or collaboration.
      </p>
      <div className="mt-8 flex flex-wrap gap-6">
        <a href={site.links.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">
          GitHub
        </a>
        <a href={site.links.email} className="text-sm font-medium text-accent">
          Email
        </a>
        <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
