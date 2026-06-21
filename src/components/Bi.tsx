import type { L } from "@/content/types";

// 日本語を主、英語を補助として併記表示するヘルパー。
// 親要素（h1, p, dd など）の中に置いて使います。
export function Bi({
  v,
  enClass = "mt-1 block text-sm font-normal text-muted",
}: {
  v: L;
  enClass?: string;
}) {
  return (
    <>
      {v.ja}
      <span className={enClass}>{v.en}</span>
    </>
  );
}
