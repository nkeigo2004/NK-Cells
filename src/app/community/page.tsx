import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <Section eyebrow="Community" title="コミュニティ / Community">
      <div className="rounded-lg border border-line bg-surface/30 p-8 text-center">
        <p className="inline-block rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
          準備中 / Coming soon
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          ここは、訪れた人どうしが交流できるコミュニティになる予定です。
          投稿・コメント・リアクション、そして LIVE 配信を計画しています（Phase 2 以降で公開）。
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted/70">
          A space for visitors to connect — posts, comments, reactions, and live
          streaming. Launching in a later phase.
        </p>
      </div>
    </Section>
  );
}
