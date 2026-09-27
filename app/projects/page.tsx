import type { Metadata } from "next";
import { getAllProjects } from "@/content/projects";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectsGrid } from "@/components/shared/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "직접 기획하고 개발한 프로젝트들을 모아봤습니다.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-20">
      <SectionHeading eyebrow="PROJECTS" title="무엇을 만들었는가" />
      <ProjectsGrid projects={projects} />
    </Container>
  );
}
