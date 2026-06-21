import type { Metadata } from "next";
import Link from "next/link";
import { notes } from "@/content/notes";
import { Section } from "@/components/Section";
import { Bi } from "@/components/Bi";

export const metadata: Metadata = { title: "Notes" };

function sortedNotes() {
  return [...notes].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function NotesPage() {
  return (
    <Section eyebrow="Log" title="ノート / Notes">
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
        研究や告知に収まらない、自由な記録です。{" "}
        <code className="font-mono text-fg">src/content/notes.ts</code>{" "}
        に追記すると一覧に並び、クリックで詳細を読めます。
      </p>

      <ul className="divide-y divide-line border-y border-line">
        {sortedNotes().map((n) => (
          <li key={n.slug}>
            <Link
              href={`/notes/${n.slug}`}
              className="group block py-6 transition-colors hover:bg-surface/30"
            >
              <p className="font-mono text-xs text-muted">{n.date}</p>
              <h3 className="mt-1.5 font-display text-lg font-medium tracking-tight group-hover:text-fg">
                <Bi v={n.title} enClass="mt-0.5 block text-sm font-normal text-muted" />
                <span className="ml-1 text-muted group-hover:text-accent">→</span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                <Bi v={n.summary} enClass="mt-1.5 block text-muted/70" />
              </p>
              {n.tags && n.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {n.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
