import { useState, useEffect, useCallback } from "react";

interface Popup {
  id: number;
  message: string;
  x: number;
  y: number;
}

export const usePopups = () => {
  const [popups, setPopups] = useState<Popup[]>([]);

  const messages: string[] = [
    "System Warning: Productivity Critical",
    "System Alert: Virtual Memory Low",
    "System Error: Clippy Overload",
    "Security Notice: Mouse Activity Suspicious",
    "Reminder: Please touch grass",
  ];

  const getRandomMessage = useCallback(() => {
    return messages[Math.floor(Math.random() * messages.length)];
  }, [messages]);

  const spawnPopup = useCallback(() => {
    const popupWidth = 240;
    const popupHeight = 140;

    const screenW =
      typeof window !== "undefined" ? window.innerWidth : 400;
    const screenH =
      typeof window !== "undefined" ? window.innerHeight : 700;

    const marginX = 16;
    const marginY = 32;

    const maxX = Math.max(screenW - popupWidth - marginX, marginX);
    const maxY = Math.max(screenH - popupHeight - marginY - 60, marginY);

    const x =
      Math.floor(Math.random() * (maxX - marginX + 1)) + marginX;
    const y =
      Math.floor(Math.random() * (maxY - marginY + 1)) + marginY;

    const newPopup: Popup = {
      id: Date.now() + Math.floor(Math.random() * 100000),
      message: getRandomMessage(),
      x,
      y,
    };

    setPopups((prev) => [...prev, newPopup]);
  }, [getRandomMessage]);

  useEffect(() => {
    let timeoutId: number;

    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 15000; // 15-30s
      timeoutId = window.setTimeout(() => {
        spawnPopup();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [spawnPopup]);

  const dismissPopup = (id: number) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  return { popups, dismissPopup };
};
