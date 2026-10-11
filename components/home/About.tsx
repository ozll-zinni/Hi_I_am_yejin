import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { Section } from "./Section";

export function About({ index }: { index: number }) {
  return (
    <Section id="about" index={index} title="About">
      <p className="max-w-3xl whitespace-pre-line break-keep text-xl leading-relaxed tracking-tight sm:text-[26px]">
        {site.about}
      </p>
      <dl id="skills" className="mt-20 grid gap-8 text-[15px] sm:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="border-t border-border pt-3">
            <dt className="text-muted">{group.title}</dt>
            <dd className="mt-2 leading-relaxed">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
