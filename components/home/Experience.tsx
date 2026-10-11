import { experience, otherExperiences, type Experience as Item } from "@/content/experience";
import { Section } from "./Section";

export function Experience({ index }: { index: number }) {
  return <ExperienceSection id="experience" title="Experience" items={experience} index={index} />;
}

export function OtherExperiences({ index }: { index: number }) {
  return <ExperienceSection id="other-experiences" title="Other Experiences" items={otherExperiences} index={index} />;
}

function ExperienceSection({ id, title, items, index }: { id: string; title: string; items: Item[]; index: number }) {
  return (
    <Section id={id} index={index} title={title}>
      <ol>
        {items.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="grid gap-4 border-t border-border py-10 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr_auto] sm:gap-8"
          >
            <p className="text-[15px] tabular-nums text-muted">{item.period}</p>
            <div>
              <h3 className="text-2xl tracking-tight sm:text-3xl">{item.company}</h3>
              <p className="mt-1 text-[15px] text-muted">{item.role}</p>
              {item.description && <p className="mt-6 break-keep text-[17px] leading-relaxed">{item.description}</p>}
              <ul className="mt-6 flex list-disc flex-col gap-2 break-keep pl-5 text-[17px] leading-relaxed text-muted">
                {item.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <p className="text-[15px] text-muted sm:text-right">{item.stack.join(" · ")}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
