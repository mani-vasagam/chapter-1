interface TbLogoProps { className?: string; showName?: boolean; }

export function TbLogo({ className, showName = true }: TbLogoProps) {
  return (
    <span className={className} data-tb-foundation="logo" aria-label="Chapter 1">
      <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--tb-radius)] bg-[var(--tb-ink)] font-bold text-[var(--tb-accent)]">CH</span>
      {showName ? <span className="ml-2 font-semibold text-[var(--tb-ink)]">Chapter 1</span> : null}
    </span>
  );
}