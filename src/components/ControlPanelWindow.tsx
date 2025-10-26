import React from "react";
import XpWindow from "./XpWindow";

interface ControlPanelWindowProps {
  clippyClicks: number;
  dogClicks: number;
  popupsClosed: number;
  onClose: () => void;

  onDragPointerDown: (e: React.PointerEvent) => void;
}

const ControlPanelWindow: React.FC<ControlPanelWindowProps> = ({
  clippyClicks,
  dogClicks,
  popupsClosed,
  onClose,
  onDragPointerDown,
}) => {
  const achievements = [
    { label: "Clicked Clippy 10 times", achieved: clippyClicks >= 10 },
    { label: "Clicked Dog 10 times", achieved: dogClicks >= 10 },
    { label: "Closed 5 error popups", achieved: popupsClosed >= 5 },
  ];

  return (
    <XpWindow
      title="Control Panel"
      onClose={onClose}
      onDragPointerDown={onDragPointerDown}
    >
      <div style={{ fontSize: 12, lineHeight: "16px" }}>
        <p>
          <strong>Achievements:</strong>
        </p>
        <ul style={{ listStyle: "none", paddingLeft: 12, margin: 0 }}>
          {achievements.map((ach, idx) => (
            <li
              key={idx}
              style={{
                color: ach.achieved ? "black" : "#6b7280",
                fontSize: 12,
                lineHeight: "16px",
              }}
            >
              {ach.achieved ? "☑" : "☐"} {ach.label}
            </li>
          ))}
        </ul>
      </div>
    </XpWindow>
  );
};

export default ControlPanelWindow;
