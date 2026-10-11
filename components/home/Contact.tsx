import { site } from "@/content/site";
import { Section } from "./Section";

const links = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Email", href: site.links.email },
];

export function Contact({ index }: { index: number }) {
  return (
    <Section id="contact" index={index} title="Contact">
      {/* TODO(copy): 실제 문구로 교체 */}
      <p className="whitespace-pre-line text-4xl leading-tight tracking-tight sm:text-6xl">
        {"같이 이야기하고 싶은 게 있다면\n편하게 연락 주세요."}
      </p>
      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
              className="underline underline-offset-4 hover:text-muted"
            >
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
