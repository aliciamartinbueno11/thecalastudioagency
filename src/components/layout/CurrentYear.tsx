"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Año actual en el cliente; en el servidor usa el año del build. */
export function CurrentYear({ initial }: { initial: number }) {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => initial);
  return <>{year}</>;
}
