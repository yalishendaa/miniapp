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
  return (
    <XpWindow
      title="My Profile"
      onClose={onClose}
      onDragPointerDown={onDragPointerDown}
    >
      <div
        style={{
          fontSize: 12,
          lineHeight: "16px",
          fontFamily: "system-ui, sans-serif",
          color: "#000",
        }}
      >
        {/* заголовок уровня */}
        <p
          style={{
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Lvl.{levelNumber} {levelTitle}
        </p>

        {/* бар прогресса до след уровня */}
        <XpBar xp={xp} xpToNext={nextLevelXpThreshold} />

        {/* цифры */}
        <p style={{ marginTop: 4 }}>
          <strong>Total XP:</strong> {xp}
        </p>

        <p>
          <strong>Next level in:</strong>{" "}
          {xpToNextLevel > 0 ? `${xpToNextLevel} XP` : "Level up ready"}
        </p>

        <p style={{ marginTop: 8 }}>
          <strong>Daily XP left:</strong> {dailyRemaining}
        </p>
      </div>
    </XpWindow>
  );
};

export default ProfileWindow;
