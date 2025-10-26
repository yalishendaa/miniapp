import React, { useState } from "react";
import { useXp } from "../hooks/useXp";
import { usePopups } from "../hooks/usePopups";
import { useDraggable } from "../hooks/useDraggable";

import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import ProfileWindow from "./ProfileWindow";
import ControlPanelWindow from "./ControlPanelWindow";
import DraggablePopup from "./DraggablePopup";
import Clippy from "./Clippy";
import DogAssistant from "./DogAssistant";

const Desktop: React.FC = () => {
  // Достаём ВСЁ из useXp()
  const {
    xp,
    levelNumber,
    levelTitle,
    nextLevelXpThreshold,
    xpToNextLevel,
    dailyRemaining,

    clippyClicks,
    dogClicks,
    popupsClosed,

    gainXp,
    incrementClippyClicks,
    incrementDogClicks,
    incrementPopupsClosed,
  } = useXp();

  // попапы (системные предупреждения)
  const { popups, dismissPopup } = usePopups();

  // окна
  const [profileOpen, setProfileOpen] = useState(true);
  const [controlPanelOpen, setControlPanelOpen] = useState(true);

  // перетаскивание окон и ассистентов
  const profileDrag = useDraggable(160, 60); // окно профиля
  const controlPanelDrag = useDraggable(140, 200); // окно панели
  const clippyDrag = useDraggable(40, 300); // клиппи
  const dogDrag = useDraggable(220, 320); // собака

  // клик по клиппи -> XP + счётчик
  const handleClippyClick = () => {
    gainXp(1);
    incrementClippyClicks();
  };

  // клик по собаке -> XP + счётчик
  const handleDogClick = () => {
    gainXp(1);
    incrementDogClicks();
  };

  // закрытие попапа -> XP + счётчик
  const handlePopupClose = (id: number) => {
    gainXp(5);
    incrementPopupsClosed();
    dismissPopup(id);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "430px", // мобильная ширина мини-аппа
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #1e40af",
        backgroundImage: "url(/assets/xp_wallpaper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "system-ui, sans-serif",
        userSelect: "none",
      }}
      draggable={false}
    >
      {/* Иконки на рабочем столе */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 10,
        }}
        draggable={false}
      >
        <DesktopIcon
          label="My Profile"
          iconSrc="/assets/profile_icon.png"
          onOpen={() => setProfileOpen(true)}
        />
        <DesktopIcon
          label="Control Panel"
          iconSrc="/assets/control_panel_icon.png"
          onOpen={() => setControlPanelOpen(true)}
        />
      </div>

      {/* Окно профиля (таскается за синий бар) */}
      {profileOpen && (
        <div
          style={{
            position: "absolute",
            left: profileDrag.x,
            top: profileDrag.y,
            zIndex: 30,
            touchAction: "none",
            userSelect: "none",
            cursor: "default",
          }}
          draggable={false}
        >
          <ProfileWindow
            xp={xp}
            levelNumber={levelNumber}
            levelTitle={levelTitle}
            nextLevelXpThreshold={nextLevelXpThreshold}
            xpToNextLevel={xpToNextLevel}
            dailyRemaining={dailyRemaining}
            onClose={() => setProfileOpen(false)}
            onDragPointerDown={profileDrag.onPointerDown}
          />
        </div>
      )}

      {/* Окно Control Panel (таскается за синий бар) */}
      {controlPanelOpen && (
        <div
          style={{
            position: "absolute",
            left: controlPanelDrag.x,
            top: controlPanelDrag.y,
            zIndex: 30,
            touchAction: "none",
            userSelect: "none",
            cursor: "default",
          }}
          draggable={false}
        >
          <ControlPanelWindow
            clippyClicks={clippyClicks}
            dogClicks={dogClicks}
            popupsClosed={popupsClosed}
            onClose={() => setControlPanelOpen(false)}
            onDragPointerDown={controlPanelDrag.onPointerDown}
          />
        </div>
      )}

      {/* Клиппи (перетаскиваем целиком) */}
      <div
        style={{
          position: "absolute",
          left: clippyDrag.x,
          top: clippyDrag.y,
          zIndex: 100,
          touchAction: "none",
          userSelect: "none",
          cursor: "move",
          padding: 4,
          borderRadius: 4,
        }}
        onPointerDown={clippyDrag.onPointerDown}
        draggable={false}
      >
        <Clippy
          onClick={handleClippyClick}
          dailyRemaining={dailyRemaining}
        />
      </div>

      {/* Собака (перетаскиваем целиком) */}
      <div
        style={{
          position: "absolute",
          left: dogDrag.x,
          top: dogDrag.y,
          zIndex: 100,
          touchAction: "none",
          userSelect: "none",
          cursor: "move",
          padding: 4,
          borderRadius: 4,
        }}
        onPointerDown={dogDrag.onPointerDown}
        draggable={false}
      >
        <DogAssistant
          onClick={handleDogClick}
          dailyRemaining={dailyRemaining}
        />
      </div>

      {/* Всплывающие системные ошибки (каждый со своим драгом за шапку) */}
      {popups.map((popup) => (
        <DraggablePopup
          key={popup.id}
          id={popup.id}
          message={popup.message}
          startX={popup.x}
          startY={popup.y}
          onClose={handlePopupClose}
        />
      ))}

    </div>
  );
};

export default Desktop;
