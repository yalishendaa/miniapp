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
        cursor: "pointer",
      }}
    >
      <img
        src={iconSrc}
        alt={label}
        style={{
          width: 48,
          height: 48,
          imageRendering: "pixelated", // более ретро ощущение
        }}
      />
      <span
        style={{
          marginTop: 4,
          color: "white",
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
