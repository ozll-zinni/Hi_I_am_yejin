export function ComingSoon({ message }: { message: string }) {
  return (
    <div className="rounded-[--radius-base] border border-dashed border-border py-16 text-center">
      <p className="font-mono text-xs tracking-wider text-accent">준비중</p>
      <p className="mt-3 text-sm text-muted">{message}</p>
    </div>
  );
}
