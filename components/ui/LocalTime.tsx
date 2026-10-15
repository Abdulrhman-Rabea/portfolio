"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Africa/Cairo",
});

// Re-check the time every 30 seconds
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => ""; // the server doesn't render a time

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <span className="inline-block min-w-[5ch] tabular-nums">{time}</span>;
}