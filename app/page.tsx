"use client";

import React from "react";
import Desktop from "../src/components/Desktop";
import { useFarcasterUser } from "../src/hooks/useFarcasterUser";

export default function Page() {
  // просто вызвать, чтобы:
  // - внутри Farcaster: sdk.actions.ready() -> снимает сплэш
  // - вне Farcaster: не упасть
  useFarcasterUser();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Desktop />
    </div>
  );
}
