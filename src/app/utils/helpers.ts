// src/app/utils/helpers.ts

import troopStatsData from '../../../public/troop_stats.json';

export function getTroopStats(troopType: string, level: string) {
  const stats = troopStatsData[level as keyof typeof troopStatsData]?.[troopType as keyof (typeof troopStatsData)[keyof typeof troopStatsData]];

  if (!stats) {
    throw new Error(`Invalid troop type '${troopType}' or level '${level}'.`);
  }

  return stats;
}

export function parseTroopCount(troopInput: string, totalTroops: number): number {
  if (troopInput.includes('%')) {
    const ratio = parseFloat(troopInput.replace('%', '')) / 100;
    return Math.floor(totalTroops * ratio);
  } else {
    const count = parseInt(troopInput, 10);
    if (isNaN(count)) {
      throw new Error(`Invalid troop count input: ${troopInput}`);
    }
    return count;
  }
}
