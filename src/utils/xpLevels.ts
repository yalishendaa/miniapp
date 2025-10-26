// здесь мы описываем шкалу опыта
// простая формула:
// - каждый новый уровень требует +100 XP
// - то есть:
//   Lvl.1 = 0-99
//   Lvl.2 = 100-199
//   Lvl.3 = 200-299
//   Lvl.4 = 300-399
//   ...
// это бесконечно масштабируется

// названия рангов по уровню
// если уровня нет в списке – берём последнее звание
const levelTitles: { minLevel: number; title: string }[] = [
  { minLevel: 1, title: "Rookie" },
  { minLevel: 3, title: "Power User" },
  { minLevel: 5, title: "System Admin" },
  { minLevel: 8, title: "Kernel Wizard" },
  { minLevel: 12, title: "Root Access" },
];

// утилита: по общему XP сказать:
// - номер уровня
// - звание (title)
// - сколько XP нужно для след. уровня
export function getLevelInfo(totalXp: number) {
  // каждые 100 XP = новый уровень
  // пример: xp=0 -> level 1, xp=250 -> level 3, xp=740 -> level 8
  const levelNumber = Math.floor(totalXp / 100) + 1;

  // сколько XP надо на следующий уровень
  const nextLevelXpThreshold = levelNumber * 100; // пример: для Lvl.3 (200-299) next=300
  const xpIntoThisLevel = totalXp; // просто текущее число
  const xpToNextLevel = nextLevelXpThreshold - xpIntoThisLevel;

  // выбрать звание по таблице levelTitles
  // находим самую последнюю запись, где minLevel <= levelNumber
  let title = "User";
  for (const row of levelTitles) {
    if (levelNumber >= row.minLevel) {
      title = row.title;
    }
  }

  return {
    levelNumber,          // число, типа 3
    title,                // строка, типа "Power User"
    nextLevelXpThreshold, // сколько XP нужно всего для след. левела
    xpToNextLevel,        // сколько осталось до след. левела
  };
}
