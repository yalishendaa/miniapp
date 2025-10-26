import React from "react";

interface ErrorPopupProps {
  id: number;
  message: string;
  onClose: () => void;

  // мы будем передавать сюда обработчик перетаскивания только для шапки
  onDragPointerDown: (e: React.PointerEvent) => void;
}

const ErrorPopupWindow: React.FC<ErrorPopupProps> = ({
  message,
  onClose,
  onDragPointerDown,
}) => {
  return (
    <div
      style={{
        width: 240,
        border: "1px solid #1e40af",
        backgroundColor: "#ECE9D8",
        boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
        fontSize: 12,
        lineHeight: 1.3,
        color: "black",
        fontFamily: "system-ui, sans-serif",
        userSelect: "none",
      }}
      draggable={false}
    >
      {/* синяя шапка — только она запускает drag */}
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
          userSelect: "none",
        }}
      >
        <span>System Warning</span>
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

      {/* тело попапа */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: 12,
          gap: 8,
          backgroundColor: "#ECE9D8",
          userSelect: "none",
        }}
        draggable={false}
      >
        {/* иконка слева */}
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#facc15",
            border: "1px solid #000",
            color: "#000",
            fontSize: 12,
            fontWeight: 700,
            lineHeight: "30px",
            textAlign: "center",
            userSelect: "none",
          }}
          draggable={false}
        >
          !
        </div>

        {/* текст справа */}
        <div
          style={{
            flex: 1,
            fontSize: 13,
            lineHeight: "16px",
            color: "#000",
            whiteSpace: "pre-line",
            userSelect: "none",
          }}
          draggable={false}
        >
          {message}
        </div>
      </div>

      {/* кнопка OK */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 12px 12px",
          backgroundColor: "#ECE9D8",
          userSelect: "none",
        }}
        draggable={false}
      >
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#d1d5db",
            border: "1px solid #9ca3af",
            fontSize: 12,
            lineHeight: "16px",
            padding: "4px 12px",
            cursor: "pointer",
            userSelect: "none",
          }}
          draggable={false}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorPopupWindow;
