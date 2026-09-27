export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="mb-3 font-mono text-sm tracking-wider text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
