"use client";

import React, { useEffect } from "react";
import Desktop from "./components/Desktop";

// если у тебя реально используется sdk из миникита — ок
// если нет или оно ругается, можешь временно закомментить sdk
// import { sdk } from "@farcaster/miniapp-sdk";

const App: React.FC = () => {
  useEffect(() => {
    // если sdk есть — держи
    // если sdk нет — закомментить целиком чтобы не крашнулось тихо
    // sdk.actions.ready();
  }, []);

  return (
    <div
      style={{
        // черный фон вокруг "экрана xp", чтобы оно выглядело как окно телефона
        backgroundColor: "black",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Desktop />
    </div>
  );
};

export default App;
