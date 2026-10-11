import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { Experience, OtherExperiences } from "@/components/home/Experience";
import { RecentBlogPosts } from "@/components/home/RecentBlogPosts";
import { Container } from "@/components/shared/Container";
import { getFeaturedProjects } from "@/content/projects";
import { getAllBlogPosts } from "@/lib/blog";

export default function Home() {
  // Empty sections stay hidden until there is content; numbering follows what's shown.
  const sections = [
    About,
    ...(getFeaturedProjects().length > 0 ? [SelectedProjects] : []),
    Experience,
    ...(getAllBlogPosts().length > 0 ? [RecentBlogPosts] : []),
    OtherExperiences,
  ];

  return (
    <Container>
      <Hero />
      {sections.map((Section, i) => (
        <Section key={i} index={i + 1} />
      ))}
    </Container>
  );
}
