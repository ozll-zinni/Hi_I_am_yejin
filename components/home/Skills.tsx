import { skillGroups } from "@/content/skills";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tag } from "@/components/shared/Tag";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 py-20">
      <SectionHeading eyebrow="SKILLS" title="어떤 기술을 사용하는가" />
      <div className="grid gap-8 sm:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-4 font-mono text-xs tracking-wider text-muted">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
