import type { ReactNode } from 'react';
import { TbLogo } from './TbLogo';

const routes = [{"path":"/","label":"Home","inPrimaryNavigation":true,"protected":false},{"path":"/-main-","label":"HomePage","inPrimaryNavigation":true,"protected":false},{"path":"/home","label":"Home","inPrimaryNavigation":true,"protected":false},{"path":"/products","label":"Products","inPrimaryNavigation":true,"protected":false},{"path":"/product-detail","label":"Product Detail","inPrimaryNavigation":true,"protected":false},{"path":"/cart","label":"Cart","inPrimaryNavigation":true,"protected":false}] as const;
const primaryCta = {"label":"Book a time","target":"#booking"} as { label: string; target: string };
const secondaryCta = {"label":"HomePage","target":"/-main-"} as { label: string; target: string } | null;
const appName = "Chapter 1";

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tb-accent)]';
const navLink =
  'rounded-[var(--tb-radius)] px-3 py-2 text-sm font-medium text-[var(--tb-muted)] transition-colors hover:text-[var(--tb-ink)] ' +
  focusRing;
const primaryButton =
  'inline-flex items-center justify-center rounded-[var(--tb-radius)] bg-[var(--tb-accent)] px-4 py-2 text-sm font-semibold text-[var(--tb-accent-text)] transition-opacity hover:opacity-90 ' +
  focusRing;
const secondaryButton =
  'inline-flex items-center justify-center rounded-[var(--tb-radius)] border border-[var(--tb-border)] px-4 py-2 text-sm font-semibold text-[var(--tb-ink)] transition-colors hover:bg-[var(--tb-background)] ' +
  focusRing;

export function TbLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--tb-background)] text-[var(--tb-ink)]">
      <a
        href="#tb-main"
        className={'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--tb-radius)] focus:bg-[var(--tb-surface)] focus:px-4 focus:py-2 ' + focusRing}
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--tb-border)] bg-[var(--tb-surface)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
          <a href="/" aria-label={appName} className={'rounded-[var(--tb-radius)] ' + focusRing}>
            <TbLogo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {routes.map((route) => (
              <a key={route.path} href={route.path} className={navLink}>
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {secondaryCta ? (
              <a href={secondaryCta.target} className={secondaryButton}>
                {secondaryCta.label}
              </a>
            ) : null}
            <a href={primaryCta.target} className={primaryButton}>
              {primaryCta.label}
            </a>
          </div>

          {/* Mobile menu: <details> keeps this working with no JS, no hydration
              risk, and no dependency — usable down to a 375px viewport. */}
          <details className="relative md:hidden">
            <summary
              aria-label="Open menu"
              className={'flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-[var(--tb-radius)] border border-[var(--tb-border)] [&::-webkit-details-marker]:hidden ' + focusRing}
            >
              <span aria-hidden="true" className="text-lg leading-none">☰</span>
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-[var(--tb-radius)] border border-[var(--tb-border)] bg-[var(--tb-surface)] p-2 shadow-lg">
              <nav aria-label="Primary" className="flex flex-col">
                {routes.map((route) => (
                  <a key={route.path} href={route.path} className={navLink}>
                    {route.label}
                  </a>
                ))}
              </nav>
              <div className="mt-2 flex flex-col gap-2 border-t border-[var(--tb-border)] pt-2">
                {secondaryCta ? (
                  <a href={secondaryCta.target} className={secondaryButton}>
                    {secondaryCta.label}
                  </a>
                ) : null}
                <a href={primaryCta.target} className={primaryButton}>
                  {primaryCta.label}
                </a>
              </div>
            </div>
          </details>
        </div>
      </header>

      <main id="tb-main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-[var(--tb-border)] bg-[var(--tb-surface)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <TbLogo />
          </div>
          {routes.length > 0 ? (
            <nav aria-label="Footer" className="flex flex-col gap-1 sm:items-end">
              {routes.map((route) => (
                <a key={route.path} href={route.path} className={navLink}>
                  {route.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
        <div className="border-t border-[var(--tb-border)] px-4 py-6 text-center text-sm text-[var(--tb-muted)]">
          © {new Date().getFullYear()} {appName}
        </div>
      </footer>
    </div>
  );
}