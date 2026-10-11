import type { Metadata } from "next";
import { getAllProjects } from "@/content/projects";
import { Container } from "@/components/shared/Container";
import { ProjectList } from "@/components/shared/ProjectList";
import { Section } from "@/components/home/Section";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <Container className="pb-20 sm:pb-28">
      <Section id="work" index={1} title="Work">
        <div className="mt-16 sm:mt-20">
          <ProjectList projects={getAllProjects()} />
        </div>
      </Section>
    </Container>
  );
}
