import type { Metadata } from "next";
import { getAllPlaygroundItems } from "@/content/playground";
import { ListPage } from "@/components/shared/ListPage";
import { RowList } from "@/components/shared/RowList";

export const metadata: Metadata = {
  title: "Playground",
  description: "완성된 프로젝트는 아니지만 자유롭게 실험한 작업들입니다.",
};

export default function PlaygroundPage() {
  return (
    <ListPage title="Playground" lead="완성되지 않아도 괜찮은, 자유로운 실험 공간입니다.">
      <RowList
        empty="곧 실험한 작업들을 올릴 예정입니다."
        rows={getAllPlaygroundItems().map((item) => ({
          href: `/playground/${item.slug}`,
          meta: item.date,
          title: item.title,
          label: item.category,
          body: item.description,
          aside: item.stack.join(" · "),
        }))}
      />
    </ListPage>
  );
}
