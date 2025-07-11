"use client";

import { useEffect, useState } from "react";

export async function getProperties() {
  return await import("../static-props/technologies.json").then((module) => module.default);
}

export function useProperties() {
  const [properties, setProperties] = useState<Properties | null>(null);
  useEffect(() => {
    getProperties().then(setProperties);
  }, []);
  return properties;
}
export type Properties = Awaited<ReturnType<typeof getProperties>>;
