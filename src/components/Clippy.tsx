import React, { useState, useEffect } from "react";

interface ClippyProps {
  onClick: () => void;
  dailyRemaining: number;
}

const clippyMessagesActive = [
  "it looks like you're trying to farm xp",
  "tip: clicking me improves system stability",
  "need help boosting efficiency?",
];

const clippyMessagesExhausted = [
  "system resources exhausted",
  "daily quota reached",
  "come back tomorrow, user",
];

const CLIPPY_SRC = "/assets/clippy.gif";

const CLIPPY_W = 200;
const CLIPPY_H = 200;

const Clippy: React.FC<ClippyProps> = ({ onClick, dailyRemaining }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  const messages =
    dailyRemaining > 0 ? clippyMessagesActive : clippyMessagesExhausted;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMsgIndex((i) => i + 1);
    }, 4000);
    return () => {
      window.clearInterval(interval);
    };
  }, [messages.length]); // линтер больше не орёт

  const shownMsg = messages[msgIndex % messages.length];

  const handleClick = () => {
    if (dailyRemaining > 0) {
      onClick();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: CLIPPY_W,
        userSelect: "none",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        color: "#000",
        fontSize: 12,
        lineHeight: "14px",
      }}
      draggable={false}
    >
      {/* пузырь с текстом над клиппи */}
      <div
        style={{
          position: "absolute",
          top: -30,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid #000",
          boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
          borderRadius: 4,
          padding: "6px 8px",
          minWidth: 140,
          maxWidth: 160,
          fontSize: 12,
          lineHeight: "14px",
          zIndex: 10,
          userSelect: "none",
        }}
        draggable={false}
      >
        {shownMsg}
      </div>

      {/* сам клиппи */}
      <div
        style={{
          width: CLIPPY_W,
          height: CLIPPY_H,
          cursor: dailyRemaining > 0 ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
        onClick={handleClick}
        draggable={false}
      >
        {/* да, <img> даёт ворнинг, но это ОК для MVP / mini-app */}
        <img
          src={CLIPPY_SRC}
          alt="Clippy"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            imageRendering: "pixelated",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Clippy;
