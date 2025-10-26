import React, { useState, useEffect, useRef } from "react";

interface DogAssistantProps {
  onClick: () => void;
  dailyRemaining: number;
}

// фразы собаки
const dogMessagesActive = [
  "every click brightens my day",
  "system morale +1",
  "good human detected",
];

const dogMessagesExhausted = [
  "i'm tired...",
  "xp limit reached",
  "come back tomorrow",
];

// сколько держать "happy" после клика (мс)
const DOG_FRAME_MS = 2000;

// !!! ВАЖНО: вот сюда подставь твои реальные имена файлов
// которые лежат в public/assets
// пример:
//   idle  -> /assets/dog_idle.gif      (76x74)
//   happy -> /assets/dog_happy.gif     (220x220)
const IDLE_SRC = "/assets/dog_idle.gif";
const HAPPY_SRC = "/assets/dog_happy.gif";

// общий размер "слота" для собаки на экране
// собака всегда будет вписана внутрь этого бокса
const BOX_W = 80;
const BOX_H = 80;

const DogAssistant: React.FC<DogAssistantProps> = ({
  onClick,
  dailyRemaining,
}) => {
  // idle или happy
  const [mood, setMood] = useState<"idle" | "happy">("idle");

  // индекс сообщения собаки (для пузыря)
  const [msgIndex, setMsgIndex] = useState(0);

  // таймер отката обратно в idle
  const resetTimerRef = useRef<number | null>(null);

  // автопереключение текста в пузыре
  useEffect(() => {
    const interval = window.setInterval(() => {
      setMsgIndex((i) => i + 1);
    }, 4000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const messages =
    dailyRemaining > 0 ? dogMessagesActive : dogMessagesExhausted;
  const shownMsg = messages[msgIndex % messages.length];

  const handleDogTap = () => {
    if (dailyRemaining <= 0) {
      // лимит XP на сегодня, собака не даёт XP и не "радуется"
      return;
    }

    // xp ап
    onClick();

    // показать happy-анимацию
    setMood("happy");

    // сбросим старый таймер если он ещё был
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    // вернуть обратно в idle через DOG_FRAME_MS
    resetTimerRef.current = window.setTimeout(() => {
      setMood("idle");
    }, DOG_FRAME_MS);
  };

  const currentSrc = mood === "happy" ? HAPPY_SRC : IDLE_SRC;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
        fontSize: 12,
        lineHeight: "14px",
        color: "#000",
        textAlign: "center",
        width: BOX_W,
        userSelect: "none",
      }}
      draggable={false}
    >
      {/* пузырь над головой */}
      <div
        style={{
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid #000",
          boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
          borderRadius: 4,
          padding: "6px 8px",
          minWidth: 120,
          maxWidth: 140,
          fontSize: 12,
          lineHeight: "14px",
          position: "absolute",
          top: -70,
          zIndex: 10,
          userSelect: "none",
        }}
        draggable={false}
      >
        {shownMsg}
      </div>

      {/* фиксированная коробка под собаку */}
      <div
        style={{
          width: BOX_W,
          height: BOX_H,
          cursor: dailyRemaining > 0 ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          backgroundColor: "transparent",
        }}
        onClick={handleDogTap}
        draggable={false}
      >
        <img
          src={currentSrc}
          alt="Dog Assistant"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            imageRendering: "pixelated", // можно убрать если хочешь сглаженное
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default DogAssistant;
