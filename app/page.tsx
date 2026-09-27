import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { Experience } from "@/components/home/Experience";
import { RecentBlogPosts } from "@/components/home/RecentBlogPosts";
import { Contact } from "@/components/home/Contact";
import { Container } from "@/components/shared/Container";

export default function Home() {
  return (
    <Container>
      <Hero />
      <About />
      <Skills />
      <SelectedProjects />
      <Experience />
      <RecentBlogPosts />
      <Contact />
    </Container>
  );
}
