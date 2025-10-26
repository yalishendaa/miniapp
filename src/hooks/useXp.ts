import { useState, useEffect } from "react";
import { getLevelInfo } from "../utils/xpLevels";

const DAILY_CAP = 100; // дневной лимит XP

// ключи localStorage
const LS_TOTAL_XP = "basexp_totalXp";
const LS_DAILY_USED = "basexp_dailyUsed";
const LS_LAST_DAY = "basexp_lastDay";
const LS_CLIPPY = "basexp_clippyClicks";
const LS_DOG = "basexp_dogClicks";
const LS_POPUPS = "basexp_popupsClosed";

function getTodayDateKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function useXp() {
  const [xp, setXp] = useState(0); // общее XP
  const [dailyUsed, setDailyUsed] = useState(0); // сколько нафармил сегодня
  const [lastDayKey, setLastDayKey] = useState<string | null>(null);

  const [clippyClicks, setClippyClicks] = useState(0);
  const [dogClicks, setDogClicks] = useState(0);
  const [popupsClosed, setPopupsClosed] = useState(0);

  // загрузка из localStorage
  useEffect(() => {
    try {
      const savedXp = parseInt(localStorage.getItem(LS_TOTAL_XP) || "0", 10);
      const savedDailyUsed = parseInt(
        localStorage.getItem(LS_DAILY_USED) || "0",
        10
      );
      const savedLastDay = localStorage.getItem(LS_LAST_DAY) || null;

      const savedClippy = parseInt(localStorage.getItem(LS_CLIPPY) || "0", 10);
      const savedDog = parseInt(localStorage.getItem(LS_DOG) || "0", 10);
      const savedPopups = parseInt(localStorage.getItem(LS_POPUPS) || "0", 10);

      const todayKey = getTodayDateKey();

      // если день другой — сбрасываем дневной прогресс
      if (savedLastDay && savedLastDay !== todayKey) {
        setXp(savedXp);
        setDailyUsed(0);
        setLastDayKey(todayKey);
      } else {
        setXp(savedXp);
        setDailyUsed(savedDailyUsed);
        setLastDayKey(savedLastDay || todayKey);
      }

      setClippyClicks(savedClippy);
      setDogClicks(savedDog);
      setPopupsClosed(savedPopups);
    } catch (err) {
      console.error("Failed to load XP from localStorage", err);
    }
  }, []);

  // начисление XP
  function gainXp(amount: number) {
    const todayKey = getTodayDateKey();

    // если новый день — сбросить дневной учёт
    let currentDailyUsed = dailyUsed;
    if (lastDayKey !== todayKey) {
      currentDailyUsed = 0;
      setDailyUsed(0);
      setLastDayKey(todayKey);
      localStorage.setItem(LS_DAILY_USED, "0");
      localStorage.setItem(LS_LAST_DAY, todayKey);
    }

    // кап чекаем
    if (currentDailyUsed >= DAILY_CAP) {
      return;
    }

    // сколько реально можно добавить
    const remaining = DAILY_CAP - currentDailyUsed;
    const toAdd = Math.min(amount, remaining);

    const newXp = xp + toAdd;
    const newDaily = currentDailyUsed + toAdd;

    setXp(newXp);
    setDailyUsed(newDaily);

    localStorage.setItem(LS_TOTAL_XP, String(newXp));
    localStorage.setItem(LS_DAILY_USED, String(newDaily));
    localStorage.setItem(LS_LAST_DAY, todayKey);
  }

  // счётчики для ачивок
  function incrementClippyClicks() {
    const v = clippyClicks + 1;
    setClippyClicks(v);
    localStorage.setItem(LS_CLIPPY, String(v));
  }

  function incrementDogClicks() {
    const v = dogClicks + 1;
    setDogClicks(v);
    localStorage.setItem(LS_DOG, String(v));
  }

  function incrementPopupsClosed() {
    const v = popupsClosed + 1;
    setPopupsClosed(v);
    localStorage.setItem(LS_POPUPS, String(v));
  }

  // данные уровня
  const {
    levelNumber,
    title,
    nextLevelXpThreshold,
    xpToNextLevel,
  } = getLevelInfo(xp);

  const dailyRemaining = Math.max(0, DAILY_CAP - dailyUsed);

  return {
    // прогресс
    xp,
    levelNumber,
    levelTitle: title,
    nextLevelXpThreshold,
    xpToNextLevel,
    dailyRemaining,

    // статистика
    clippyClicks,
    dogClicks,
    popupsClosed,

    // методы
    gainXp,
    incrementClippyClicks,
    incrementDogClicks,
    incrementPopupsClosed,
  };
}
