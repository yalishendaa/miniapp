import React from "react";
import XpWindow from "./XpWindow";
import XpBar from "./XpBar";

interface ProfileWindowProps {
  xp: number;

  levelNumber: number;
  levelTitle: string;

  nextLevelXpThreshold: number;
  xpToNextLevel: number;

  dailyRemaining: number;

  onClose: () => void;
  onDragPointerDown: (e: React.PointerEvent) => void;
}

const ProfileWindow: React.FC<ProfileWindowProps> = ({
  xp,
  levelNumber,
  levelTitle,
  nextLevelXpThreshold,
  xpToNextLevel,
  dailyRemaining,
  onClose,
  onDragPointerDown,
}) => {
  // сколько уже нафармлено В ТЕКУЩЕМ ЛЕВЕЛЕ относительно следующего
  // XpBar у тебя рисует прогресс так:
  //   percent = xp / xpToNext * 100
  // где xp = текущий xp, а xpToNext = сколько нужно до апа
  //
  // в твоём хуке useXp:
  //   xpToNextLevel = "сколько осталось до апа"
  //   nextLevelXpThreshold = "всего нужно на ап"
  //
  // XpBar ожидает { xp, xpToNext }:
  //   xpToNext = сколько надо до следующего уровня
  //
  // Мы просто пробросим:
  //   xp -> твой xp
  //   xpToNext -> xpToNextLevel
  //
  // Это даёт корректную картинку прогресса.

  return (
    <XpWindow
      title="My Profile"
      onClose={onClose}
      onDragPointerDown={onDragPointerDown}
    >
      <div
        style={{
          padding: 12,
          width: 260,
          maxWidth: 260,
          fontFamily: "Tahoma, sans-serif",
          fontSize: 12,
          lineHeight: "16px",
          color: "#000",
        }}
      >
        {/* уровень и название */}
        <div style={{ marginBottom: 8 }}>
          <strong>
            Level {levelNumber} — {levelTitle}
          </strong>
        </div>

        {/* прогресс бар по XP */}
        <div style={{ marginBottom: 8 }}>
          <XpBar xp={xp} xpToNext={xpToNextLevel} />
          {/* пояснение для тебя: 
              xpToNextLevel = сколько осталось до апа.
              В XpBar это попадает как xpToNext. */}
        </div>

        {/* характеристика XP */}
        <div style={{ marginTop: 8 }}>
          <p style={{ margin: 0 }}>
            <strong>Total XP:</strong> {xp}
          </p>

          <p style={{ margin: "4px 0 0 0" }}>
            <strong>Next level target:</strong>{" "}
            {nextLevelXpThreshold} XP total
          </p>

          <p style={{ margin: "4px 0 0 0" }}>
            <strong>To next level:</strong>{" "}
            {xpToNextLevel > 0 ? `${xpToNextLevel} XP` : "Level up ready"}
          </p>

          <p style={{ margin: "8px 0 0 0" }}>
            <strong>Daily XP left:</strong> {dailyRemaining}
          </p>
        </div>

        {/* подсказки по фарму */}
        <div
          style={{
            marginTop: 12,
            backgroundColor: "#fff",
            border: "1px solid #808080",
            padding: 8,
            fontSize: 11,
            lineHeight: "14px",
            color: "#333",
          }}
        >
          <div>+1 XP: tap Clippy or Dog</div>
          <div>+5 XP: close System Error popup</div>
          <div>Daily cap resets at midnight</div>
        </div>
      </div>
    </XpWindow>
  );
};

export default ProfileWindow;
