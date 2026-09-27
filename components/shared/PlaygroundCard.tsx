import Link from "next/link";
import type { PlaygroundItem } from "@/content/playground";

export function PlaygroundCard({ item }: { item: PlaygroundItem }) {
  return (
    <Link
      href={`/playground/${item.slug}`}
      className="group flex flex-col gap-3 rounded-[--radius-base] border border-dashed border-border p-6 transition-colors hover:border-accent"
    >
      <span className="w-fit rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
        {item.category}
      </span>
      <h3 className="text-lg font-semibold tracking-tight group-hover:text-accent">
        {item.title}
      </h3>
      <p className="text-sm text-muted">{item.description}</p>
      <p className="mt-auto font-mono text-xs text-muted">{item.date}</p>
    </Link>
  );
}
