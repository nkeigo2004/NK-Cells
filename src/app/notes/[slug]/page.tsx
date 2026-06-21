import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { notes } from "@/content/notes";
import { Bi } from "@/components/Bi";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const note = notes.find((n) => n.slug === params.slug);
  return { title: note ? note.title.ja : "Note" };
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = notes.find((n) => n.slug === params.slug);
  if (!note) notFound();

  return (
    <section className="mx-auto max-w-content px-5 py-16">
      <Link
        href="/notes"
        className="font-mono text-xs text-accent hover:underline"
      >
        ← ノート一覧 / All notes
      </Link>

      <p className="mt-6 font-mono text-xs text-muted">{note.date}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {note.title.ja}
        <span className="mt-1 block text-lg font-normal text-muted">
          {note.title.en}
        </span>
      </h1>

      {note.tags && note.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 max-w-2xl border-t border-line pt-8">
        <p className="whitespace-pre-line leading-relaxed text-fg/90">
          <Bi
            v={note.body}
            enClass="mt-4 block whitespace-pre-line text-base leading-relaxed text-muted"
          />
        </p>
      </div>
    </section>
  );
}
