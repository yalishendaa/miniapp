import React from "react";

interface DesktopIconProps {
  label: string;
  iconSrc: string;
  onOpen: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, iconSrc, onOpen }) => {
  return (
    <div
      onClick={onOpen}
      style={{
        width: 64,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "default",
        userSelect: "none",
        padding: 4,
      }}
      draggable={false}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "1px solid #ffffff",
          boxShadow: "0 0 0 1px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(1px)",
        }}
      >
        <img
          src={iconSrc}
          alt={label}
          width={32}
          height={32}
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <span
        style={{
          color: "white",
          padding: "2px 6px",
          background: "rgba(30,58,138,0.6)",
          border: "1px solid #1e40af",
          borderRadius: 4,
          fontSize: 10,
          lineHeight: "12px",
          textAlign: "center",
          textShadow: "1px 1px 0px #000000",
          wordBreak: "break-word",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
