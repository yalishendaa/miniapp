import React from 'react';

interface XpBarProps {
  xp: number;
  xpToNext: number;
}

const XpBar: React.FC<XpBarProps> = ({ xp, xpToNext }) => {
  const percent = xpToNext > 0 ? Math.min((xp / xpToNext) * 100, 100) : 100;
  return (
    <div className="my-2">
      <div className="w-full bg-gray-300 border border-gray-400 h-4 relative">
        <div className="bg-blue-600 h-4" style={{ width: `${percent}%` }} />
      </div>
      <div className="text-xs mt-1 text-black">
        {xp} / {xpToNext} XP
      </div>
    </div>
  );
};

export default XpBar;
