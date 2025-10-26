/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export type FarcasterUser = {
  fid: string;
  displayName: string;
  pfpUrl: string;
};

// нормализация pfp, если приходит объект
function normalizePfp(raw: any): string {
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && raw.url && typeof raw.url === "string") {
    return raw.url;
  }
  return "";
}

// этот хук делает две вещи:
// 1. внутри Farcaster: дергает sdk.actions.ready() и получает user
// 2. вне Farcaster (браузер): не падает, просто возвращает Guest User
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
        const sdkModule: any = await import("@farcaster/miniapp-sdk");
        const sdk: any = sdkModule.default || sdkModule;

        // 👇 критично для Farcaster mini-app
        await sdk.actions.ready();

        const u: any = sdk?.context?.user;

        if (!active) return;

        setUserData({
          fid: u?.fid ? String(u.fid) : "0",
          displayName: u?.displayName || "Guest User",
          pfpUrl: normalizePfp(u?.pfpUrl),
        });
      } catch {
        // Мы не в Farcaster → просто гость
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
