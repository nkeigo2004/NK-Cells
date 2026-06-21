import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { Section } from "@/components/Section";
import { Bi } from "@/components/Bi";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  // 将来メンバー（役員）が増えたら、この1人ぶんのカードを配列にして
  // map で並べれば「役員一覧」に拡張できます。今は中根さん1名です。
  return (
    <Section eyebrow="About" title="プロフィール / About">
      <div className="rounded-lg border border-line bg-surface/30 p-6 sm:p-8">
        {/* メンバーカードのヘッダー */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-bg font-display text-xl text-accent">
            {/* イニシャル。写真にしたい場合はここを <img> に差し替え */}
            {profile.name.slice(0, 1)}
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {profile.name}
            </h2>
            <p className="mt-0.5 font-mono text-xs text-muted">
              {profile.role.ja} / {profile.role.en} · {profile.handle}
            </p>
          </div>
        </div>

        {/* メタ行 */}
        <dl className="mt-6 grid grid-cols-1 gap-y-2.5 border-t border-line pt-6 font-mono text-xs sm:grid-cols-[8rem_1fr]">
          <dt className="text-muted">field</dt>
          <dd className="text-accent">
            {profile.field.ja}{" "}
            <span className="text-accent/60">/ {profile.field.en}</span>
          </dd>
          <dt className="text-muted">status</dt>
          <dd className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="live-dot" aria-hidden />
            <span>
              {profile.status.ja}{" "}
              <span className="text-muted">/ {profile.status.en}</span>
            </span>
          </dd>
        </dl>

        {/* リンク */}
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
          {profile.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-line px-3 py-1.5 text-muted transition-colors hover:border-accent hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {l.label} ↗
            </a>
          ))}
        </div>

        {/* 自己紹介・経歴 */}
        <div className="mt-8 border-t border-line pt-6">
          <p className="whitespace-pre-line leading-relaxed text-fg/90">
            <Bi
              v={profile.bio}
              enClass="mt-3 block whitespace-pre-line text-base leading-relaxed text-muted"
            />
          </p>
        </div>
      </div>
    </Section>
  );
}
