import { useState, useRef, useCallback } from "react";

export function useDraggable(initialX: number, initialY: number) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });

  const dragOffsetRef = useRef({ dx: 0, dy: 0 });
  const draggingRef = useRef(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();

      draggingRef.current = true;

      dragOffsetRef.current = {
        dx: e.clientX - pos.x,
        dy: e.clientY - pos.y,
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      const handleMove = (_ev: PointerEvent) => {
        if (!draggingRef.current) return;

        setPos({
          x: _ev.clientX - dragOffsetRef.current.dx,
          y: _ev.clientY - dragOffsetRef.current.dy,
        });
      };

      const handleUp = () => {
        draggingRef.current = false;

        (e.target as HTMLElement).releasePointerCapture(e.pointerId);

        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        window.removeEventListener("pointercancel", handleUp);
      };

      window.addEventListener("pointermove", handleMove, { passive: false });
      window.addEventListener("pointerup", handleUp, { passive: false });
      window.addEventListener("pointercancel", handleUp, { passive: false });
    },
    [pos.x, pos.y]
  );

  return {
    x: pos.x,
    y: pos.y,
    onPointerDown,
  };
}
