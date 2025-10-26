import React from "react";
import XpWindow from "./XpWindow";
import XpBar from "./XpBar";

interface ProfileWindowProps {
  xp: number;

  levelNumber: number;
  levelTitle: string;

  nextLevelXpThreshold: number; // сколько нужно total для апа
  xpToNextLevel: number;        // сколько ещё осталось до апа

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
  // сколько уже нафармлено в рамках текущего пути к апу
  // условно: "из скольки"
  const earnedSoFar =
    nextLevelXpThreshold > 0
      ? nextLevelXpThreshold - xpToNextLevel
      : 0;

  // передаём в полосу прогресса:
  // XpBar ожидает { xp, xpToNext }:
  //   xp        -> текущее накопленное в уровне (earnedSoFar)
  //   xpToNext  -> сколько осталось до апа (xpToNextLevel)
  //
  // Это делает полосу = earnedSoFar / (earnedSoFar + xpToNextLevel)
  // что визуально совпадает с реальностью.
  //
  // пример:
  // нужно 100
  // осталось 34
  // набито уже 66
  // полоса будет 66 / (66+34) = 66/100 = 66%
  //
  // и подпись под баром будет "66 / 100 XP", что читается нормально.
  const barXpCurrent = earnedSoFar;
  const barXpToNext = xpToNextLevel;

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
        <div style={{ marginBottom: 8, fontWeight: "bold", fontSize: 14, lineHeight: "18px" }}>
          Level {levelNumber} — {levelTitle}
        </div>

        {/* прогресс бар */}
        <div style={{ marginBottom: 4 }}>
          <XpBar xp={barXpCurrent} xpToNext={barXpToNext} />
        </div>

        {/* подпись под баром: "66 / 100 XP" */}
        <div style={{ fontSize: 12, marginBottom: 12 }}>
          {earnedSoFar} / {nextLevelXpThreshold} XP
        </div>

        {/* статы XP */}
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
