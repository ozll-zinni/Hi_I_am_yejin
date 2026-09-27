export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm text-foreground">
      {children}
    </span>
  );
}
