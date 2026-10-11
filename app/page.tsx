import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Experience, OtherExperiences } from "@/components/home/Experience";
import { RecentBlogPosts } from "@/components/home/RecentBlogPosts";
import { Container } from "@/components/shared/Container";
import { getAllBlogPosts } from "@/lib/blog";

export default function Home() {
  // Empty sections stay hidden until there is content; numbering follows what's shown.
  const sections = [
    About,
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
