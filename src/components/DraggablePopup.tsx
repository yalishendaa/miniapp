import React from "react";
import { useDraggable } from "../hooks/useDraggable";
import ErrorPopupWindow from "./ErrorPopupWindow";

interface DraggablePopupProps {
  id: number;
  message: string;
  startX: number;
  startY: number;
  onClose: (id: number) => void;
}

const DraggablePopup: React.FC<DraggablePopupProps> = ({
  id,
  message,
  startX,
  startY,
  onClose,
}) => {
  const popupDrag = useDraggable(startX, startY);

  return (
    <div
      style={{
        position: "absolute",
        left: popupDrag.x,
        top: popupDrag.y,
        zIndex: 200,
        touchAction: "none",
        userSelect: "none",
        cursor: "default",
      }}
      draggable={false}
    >
      <ErrorPopupWindow
        id={id}
        message={message}
        onClose={() => onClose(id)}
        onDragPointerDown={popupDrag.onPointerDown}
      />
    </div>
  );
};

export default DraggablePopup;
