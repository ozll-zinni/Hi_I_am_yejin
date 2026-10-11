import Link from "next/link";

export type Row = {
  href: string;
  meta: string;
  title: string;
  label?: string;
  body?: string;
  aside?: string;
};

// The numbered row grid shared by the home Experience list and every index page (Work, Blog, Playground).
export function RowList({ rows, empty }: { rows: Row[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="text-[17px] text-muted">{empty}</p>;
  }

  return (
    <ol>
      {rows.map((row, i) => (
        <li key={row.href} className="border-t border-border py-10 first:border-t-0 first:pt-0">
          <Link href={row.href} className="group grid gap-4 sm:grid-cols-[11rem_1fr_auto] sm:gap-8">
            <p className="text-[15px] tabular-nums text-muted">
              ({String(i + 1).padStart(2, "0")})
              <br />
              {row.meta}
            </p>
            <div>
              <h3 className="text-2xl tracking-tight underline-offset-4 group-hover:underline sm:text-3xl">
                {row.title}
                <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </h3>
              {row.label && <p className="mt-1 text-[15px] text-muted">{row.label}</p>}
              {row.body && <p className="mt-6 text-[17px] leading-relaxed">{row.body}</p>}
            </div>
            <p className="text-[15px] text-muted sm:text-right">{row.aside}</p>
          </Link>
        </li>
      ))}
    </ol>
  );
}
