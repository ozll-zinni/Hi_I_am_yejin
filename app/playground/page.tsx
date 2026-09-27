import type { Metadata } from "next";
import { getAllPlaygroundItems } from "@/content/playground";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlaygroundCard } from "@/components/shared/PlaygroundCard";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Playground",
  description: "완성된 프로젝트는 아니지만 자유롭게 실험한 작업들입니다.",
};

export default function PlaygroundPage() {
  const items = getAllPlaygroundItems();

  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="PLAYGROUND"
        title="무엇을 실험하고 있는가"
        description="완성되지 않아도 괜찮은, 자유로운 실험 공간입니다."
      />
      {items.length === 0 ? (
        <ComingSoon message="곧 실험한 작업들을 올릴 예정입니다." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PlaygroundCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </Container>
  );
}
