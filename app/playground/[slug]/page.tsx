import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPlaygroundItems, getPlaygroundItemBySlug } from "@/content/playground";
import { Container } from "@/components/shared/Container";
import { DetailHeader, ExternalLinks, MetaGrid, repoLinks } from "@/components/shared/Detail";
import { serif } from "@/lib/fonts";

export function generateStaticParams() {
  return getAllPlaygroundItems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPlaygroundItemBySlug(slug);
  if (!item) return {};
  return { title: item.title, description: item.description };
}

export default async function PlaygroundDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPlaygroundItemBySlug(slug);
  if (!item) notFound();

  const links = repoLinks(item);

  return (
    <Container className="pb-20 sm:pb-28">
      <article className={`${serif.className} break-keep pt-20 sm:pt-28`}>
        <DetailHeader back={{ href: "/playground", label: "Playground" }} meta={item.date} title={item.title} lead={item.description} />
        <MetaGrid
          items={[
            { label: "Category", content: item.category },
            { label: "Tech Stack", content: item.stack.join(", ") },
            ...(links.length > 0 ? [{ label: "Links", content: <ExternalLinks links={links} /> }] : []),
          ]}
        />

        {item.notes.length > 0 && (
          <section className="mt-20 grid gap-4 border-t border-border py-10 sm:mt-28 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <h2 className="text-[15px] text-muted">Notes</h2>
            <div className="flex flex-col gap-3 text-[17px] leading-relaxed">
              {item.notes.map((note, i) => (
                <p key={i}>{note}</p>
              ))}
            </div>
          </section>
        )}
      </article>
    </Container>
  );
}
