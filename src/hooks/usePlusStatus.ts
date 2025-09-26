//src/hooks/usePlusStatus.ts
"use client";
import { useEffect, useState } from "react";

export function usePlusStatus(userId?: string) {
  const [hasPlus, setHasPlus] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/plus/status?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setHasPlus(data.hasPlus))
      .catch(() => setHasPlus(false));
  }, [userId]);

  return hasPlus;
}
