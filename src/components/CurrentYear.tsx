"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

export default function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <span suppressHydrationWarning>{year}</span>;
}
