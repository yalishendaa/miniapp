import React from 'react';

const Taskbar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-blue-800 flex items-center px-2 z-50">
      <button className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-md cursor-pointer">
        Base XP
      </button>
      {/* Additional taskbar items (e.g. clock) can be added here if needed */}
    </div>
  );
};

export default Taskbar;
