import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/news", label: "News" },
  { href: "/notes", label: "Notes" },
  { href: "/community", label: "Community" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4">
        <Link href="/" className="group flex items-center" aria-label={site.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={site.name}
            className="h-6 w-auto sm:h-7"
          />
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <nav className="-mx-2 flex items-center gap-0.5 font-mono text-xs">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-2.5 py-1.5 text-muted transition-colors hover:text-fg focus-visible:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
