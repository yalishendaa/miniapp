/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

export type FarcasterUser = {
  fid: string;
  displayName: string;
  pfpUrl: string;
};

// нормализуем pfpUrl, потому что из farcaster иногда приходит не строка
function normalizePfp(raw: any): string {
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && raw.url && typeof raw.url === "string") {
    return raw.url;
  }
  return "";
}

// этот хук делает так:
// - если мы внутри farcaster mini-app, он тянет юзера из sdk
// - если мы не внутри farcaster, он просто возвращает Guest User
export function useFarcasterUser() {
  const [userData, setUserData] = useState<FarcasterUser>({
    fid: "0",
    displayName: "Guest User",
    pfpUrl: "",
  });

  useEffect(() => {
    let active = true;

    async function init() {
      try {
        // динамический импорт sdk чтобы не падать на билде вне farcaster
        const sdkModule: any = await import("@farcaster/miniapp-sdk");
        const sdk: any = sdkModule.default || sdkModule;

        // важно для контейнера мини-аппов
        await sdk.actions.ready();

        const u: any = sdk?.context?.user;

        if (!active) return;

        setUserData({
          fid: u?.fid ? String(u.fid) : "0",
          displayName: u?.displayName || "Guest User",
          pfpUrl: normalizePfp(u?.pfpUrl),
        });
      } catch {
        // просто локальный режим / dev / не farcaster
        if (!active) return;
        setUserData({
          fid: "0",
          displayName: "Guest User",
          pfpUrl: "",
        });
      }
    }

    init();

    return () => {
      active = false;
    };
  }, []);

  return userData;
}
