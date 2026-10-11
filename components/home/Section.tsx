import { ReactNode } from "react";
import { serif } from "@/lib/fonts";

// Home sections share the hero's editorial look: a hairline rule with a running number.
export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${serif.className} scroll-mt-16 break-keep pt-20 sm:pt-28`}>
      <div className="mb-12 flex items-baseline justify-between border-t border-foreground pt-3 text-xs sm:mb-16 sm:text-[15px]">
        <span>({String(index).padStart(2, "0")})</span>
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}
