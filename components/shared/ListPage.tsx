import type { ReactNode } from "react";
import { Container } from "./Container";
import { Section } from "@/components/home/Section";

// Index-page shell: the home Section header, an About-style lead, then the list.
export function ListPage({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <Container className="pb-20 sm:pb-28">
      <Section id={title.toLowerCase()} index={1} title={title}>
        <p className="max-w-3xl text-xl leading-relaxed tracking-tight sm:text-[26px]">{lead}</p>
        <div className="mt-16 sm:mt-20">{children}</div>
      </Section>
    </Container>
  );
}
