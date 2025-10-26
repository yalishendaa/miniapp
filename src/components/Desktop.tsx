import React, { useState } from "react";
import { useXp } from "../hooks/useXp";
import { usePopups } from "../hooks/usePopups";
import { useDraggable } from "../hooks/useDraggable";

import DesktopIcon from "./DesktopIcon";
// import Taskbar from "./Taskbar"; // убрали панель снизу
import ProfileWindow from "./ProfileWindow";
import ControlPanelWindow from "./ControlPanelWindow";
import DraggablePopup from "./DraggablePopup";
import Clippy from "./Clippy";
import DogAssistant from "./DogAssistant";

const Desktop: React.FC = () => {
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

  const { popups, dismissPopup } = usePopups();

  const [profileOpen, setProfileOpen] = useState(true);
  const [controlPanelOpen, setControlPanelOpen] = useState(true);

  const profileDrag = useDraggable(160, 60);
  const controlPanelDrag = useDraggable(140, 200);
  const clippyDrag = useDraggable(40, 300);
  const dogDrag = useDraggable(220, 320);

  const handleClippyClick = () => {
    gainXp(1);
    incrementClippyClicks();
  };

  const handleDogClick = () => {
    gainXp(1);
    incrementDogClicks();
  };

  const handlePopupClose = (id: number) => {
    dismissPopup(id);
    gainXp(5);
    incrementPopupsClosed();
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "430px",
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
      {/* desktop icons */}
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

      {/* profile window */}
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

      {/* control panel window */}
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

      {/* Clippy */}
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
        <Clippy onClick={handleClippyClick} dailyRemaining={dailyRemaining} />
      </div>

      {/* Dog */}
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

      {/* popups */}
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

      {/* taskbar скрыли */}
      {/* <Taskbar /> */}
    </div>
  );
};

export default Desktop;
