import Link from "next/link";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { works } from "@/content/works";
import { news } from "@/content/news";
import { notes } from "@/content/notes";
import { Section } from "@/components/Section";
import { Bi } from "@/components/Bi";

const kindLabel: Record<string, string> = {
  paper: "Paper",
  project: "Project",
  talk: "Talk",
};

// ▼ トップ（入口）のキャッチコピー。自由に書き換えてOK
const intro = {
  ja: "研究の記録、つくったもの、そしてこれからの実験場。",
  en: "A home for my research, my work, and whatever comes next.",
};

// ▼ 各セクションへの入口カード。増やしたい時はここに足す
const sections = [
  {
    href: "/about",
    title: { ja: "プロフィール", en: "About" },
    desc: { ja: "経歴・研究の関心・連絡先。", en: "Background, interests, and contact." },
  },
  {
    href: "/research",
    title: { ja: "研究・制作物", en: "Research & Works" },
    desc: { ja: "論文・プロジェクト・発表の一覧。", en: "Papers, projects, and talks." },
  },
  {
    href: "/news",
    title: { ja: "ニュース", en: "News" },
    desc: { ja: "活動・お知らせの更新。", en: "Updates and announcements." },
  },
  {
    href: "/notes",
    title: { ja: "ノート", en: "Notes" },
    desc: { ja: "自由な記録・創作・メモ。", en: "Free-form notes, writing, and logs." },
  },
  {
    href: "/community",
    title: { ja: "コミュニティ", en: "Community" },
    desc: { ja: "投稿・コメント・LIVE。", en: "Posts, comments, live." },
    soon: true,
  },
];

function sortedNews() {
  return [...news].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return a.date < b.date ? 1 : -1;
  });
}

export default function HomePage() {
  const latestNews = sortedNews().slice(0, 3);
  const latestNotes = [...notes].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  const featured = works.slice(0, 2);

  return (
    <>
      {/* ── 入口ヒーロー（NK Cells のロゴを主役に） ── */}
      <section className="mx-auto max-w-content px-5 pb-12 pt-24 sm:pt-32">
        <h1 className="m-0 leading-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={site.name} className="h-12 w-auto sm:h-16" />
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg/90">
          {intro.ja}
          <span className="mt-1 block text-base text-muted">{intro.en}</span>
        </p>
        <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
          <span className="live-dot" aria-hidden />
          <span>{profile.status.ja}</span>
        </div>
      </section>

      {/* ── 各セクションへの入口カード ── */}
      <section className="mx-auto max-w-content px-5">
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {sections.map((s) => (
            <li key={s.href} className="bg-bg">
              <Link
                href={s.href}
                className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-surface/40 focus-visible:bg-surface/40 focus-visible:outline-none"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg font-medium tracking-tight">
                      {s.title.ja}
                    </h2>
                    {s.soon && (
                      <span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        準備中
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-muted">{s.title.en}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc.ja}</p>
                </div>
                <span className="font-mono text-xs text-accent">開く / Open →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 最新のニュース ── */}
      {latestNews.length > 0 && (
        <Section eyebrow="Latest" title="最新のニュース / News">
          <ul className="divide-y divide-line border-y border-line">
            {latestNews.map((item) => (
              <li key={item.date + item.title.ja} className="py-5">
                <p className="font-mono text-xs text-muted">{item.date}</p>
                <h3 className="mt-1 font-display text-base font-medium tracking-tight">
                  <Bi v={item.title} enClass="mt-0.5 block text-sm font-normal text-muted" />
                </h3>
              </li>
            ))}
          </ul>
          <Link
            href="/news"
            className="mt-5 inline-block font-mono text-xs text-accent hover:underline"
          >
            すべてのニュース / All news →
          </Link>
        </Section>
      )}

      {/* ── ピックアップ ── */}
      {featured.length > 0 && (
        <Section eyebrow="Selected" title="ピックアップ / Highlights">
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {featured.map((w) => (
              <li key={w.title.ja} className="bg-bg p-5">
                <p className="mb-2 font-mono text-xs text-accent">
                  {kindLabel[w.kind]}
                </p>
                <h3 className="font-display text-lg font-medium tracking-tight">
                  <Bi v={w.title} enClass="mt-0.5 block text-sm font-normal text-muted" />
                </h3>
                {w.meta && (
                  <p className="mt-2 font-mono text-xs text-muted">{w.meta}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <Bi v={w.summary} enClass="mt-1.5 block text-muted/70" />
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/research"
            className="mt-5 inline-block font-mono text-xs text-accent hover:underline"
          >
            すべて見る / View all →
          </Link>
        </Section>
      )}

      {/* ── 最新のノート ── */}
      {latestNotes.length > 0 && (
        <Section eyebrow="Log" title="最新のノート / Notes">
          <ul className="divide-y divide-line border-y border-line">
            {latestNotes.map((n) => (
              <li key={n.slug} className="py-5">
                <Link href={`/notes/${n.slug}`} className="group block">
                  <p className="font-mono text-xs text-muted">{n.date}</p>
                  <h3 className="mt-1 font-display text-base font-medium tracking-tight group-hover:text-fg">
                    <Bi v={n.title} enClass="mt-0.5 block text-sm font-normal text-muted" />
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/notes"
            className="mt-5 inline-block font-mono text-xs text-accent hover:underline"
          >
            すべてのノート / All notes →
          </Link>
        </Section>
      )}
    </>
  );
}
