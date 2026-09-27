import { site } from "@/content/site";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 py-20">
      <SectionHeading eyebrow="ABOUT" title="어떤 개발자인가" />
      <p className="max-w-2xl whitespace-pre-line text-lg leading-relaxed text-foreground/90">
        {site.about}
      </p>
    </section>
  );
}
