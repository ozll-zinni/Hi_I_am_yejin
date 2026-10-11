import type { Metadata } from "next";
import { getAllProjects } from "@/content/projects";
import { ListPage } from "@/components/shared/ListPage";
import { RowList } from "@/components/shared/RowList";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <ListPage title="Work" lead="">
      <RowList
        empty="공개할 프로젝트를 준비하고 있습니다."
        rows={getAllProjects().map((project) => ({
          href: `/work/${project.slug}`,
          meta: project.period,
          title: project.name,
          label: project.category.join(" · "),
          body: project.summary,
          aside: project.stack.join(" · "),
        }))}
      />
    </ListPage>
  );
}
