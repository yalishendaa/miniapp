import React from "react";

interface XpWindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;

  // добавили: возможность передать drag-событие на синий бар
  onDragPointerDown?: (e: React.PointerEvent) => void;
}

const XpWindow: React.FC<XpWindowProps> = ({
  title,
  children,
  onClose,
  onDragPointerDown,
}) => {
  return (
    <div
      style={{
        width: 260,
        border: "1px solid #1e40af",
        backgroundColor: "#ECE9D8",
        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
        fontSize: 12,
        lineHeight: 1.3,
        fontFamily: "system-ui, sans-serif",
        userSelect: "none",
      }}
    >
      {/* синяя полоса (заголовок) */}
      <div
        onPointerDown={onDragPointerDown}
        style={{
          background: "linear-gradient(to bottom,#1e40af,#3b82f6)",
          color: "white",
          height: 24,
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 700,
          fontSize: 12,
          lineHeight: "24px",
          borderBottom: "1px solid #1e40af",
          touchAction: "none",
          cursor: "move",
        }}
      >
        <span>{title}</span>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            style={{
              width: 16,
              height: 16,
              backgroundColor: "#d1d5db",
              fontSize: 10,
              lineHeight: "16px",
              textAlign: "center",
              padding: 0,
            }}
          >
            _
          </button>
          <button
            style={{
              width: 16,
              height: 16,
              backgroundColor: "#d1d5db",
              fontSize: 10,
              lineHeight: "16px",
              textAlign: "center",
              padding: 0,
            }}
          >
            □
          </button>
          <button
            onClick={onClose}
            style={{
              width: 16,
              height: 16,
              backgroundColor: "#dc2626",
              color: "white",
              fontSize: 10,
              lineHeight: "16px",
              textAlign: "center",
              padding: 0,
              fontWeight: 700,
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* тело окна */}
      <div style={{ padding: 8 }}>{children}</div>
    </div>
  );
};

export default XpWindow;
