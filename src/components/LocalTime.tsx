"use client";

import { useEffect, useState } from "react";

type Mode = "datetime" | "date";

function format(iso: string, mode: Mode, tz?: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  if (mode === "date") {
    const parts = new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: tz,
    }).formatToParts(d);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    return `${get("year")}-${get("month")}-${get("day")}`;
  }
  const date = d.toLocaleDateString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    timeZone: tz,
  });
  const time = d.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
  });
  return `${date} ${time}`;
}

// 時刻を「閲覧しているデバイスのタイムゾーン」で表示する。
// SSR・初回renderは日本時間で確定させ（ハイドレーション不一致を防ぐ）、
// マウント後に端末のタイムゾーンへ更新する。
export function LocalTime({
  iso,
  mode = "datetime",
}: {
  iso: string;
  mode?: Mode;
}) {
  const [text, setText] = useState(() => format(iso, mode, "Asia/Tokyo"));
  useEffect(() => {
    setText(format(iso, mode, undefined));
  }, [iso, mode]);
  return (
    <time dateTime={iso}>{text}</time>
  );
}
