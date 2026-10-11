import { site } from "@/content/site";
import { feroniapi, serif } from "@/lib/fonts";
import { IdCard } from "./IdCard";

export function Hero() {
  return (
    <section className={`${serif.className} relative h-[calc(100svh-4rem)] min-h-[560px]`}>
      <div className="absolute inset-x-0 top-8 z-20 flex flex-col gap-3 text-sm leading-snug sm:top-12 sm:flex-row sm:justify-between sm:text-[15px]">
        <p className="whitespace-pre-line">
          {site.tagline}{" "}
          <a href="#about" className="text-muted underline underline-offset-2 hover:text-foreground">
            [more]
          </a>
        </p>
        <p className="sm:text-right">
          {site.role}
          <br />
          {site.heroStack.join(" · ")}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-clip">
          <h1 className={`${feroniapi.className} select-none whitespace-nowrap text-center text-[20vw] leading-[1.15] pb-[0.06em]`}>
            {site.fullNameEn}
          </h1>
        </div>
      </div>

      <div className="absolute inset-y-0 left-1/2 z-10 w-screen -translate-x-1/2">
        <IdCard />
      </div>
    </section>
  );
}
