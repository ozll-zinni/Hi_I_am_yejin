import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tag } from "@/components/shared/Tag";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-20">
      <SectionHeading eyebrow="EXPERIENCE" title="어떤 회사에서 어떤 일을 했는가" />
      <ol className="flex flex-col gap-10 border-l border-border pl-8">
        {experience.map((item) => (
          <li key={`${item.company}-${item.period}`} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="font-mono text-sm tracking-wider text-accent">{item.period}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              {item.role} · {item.company}
            </h3>
            <ul className="mt-4 flex flex-col gap-1.5 text-sm text-foreground/90">
              {item.highlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-muted">·</span>
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
