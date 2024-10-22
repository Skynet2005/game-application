// src/app/models/Troop.ts

import { getTroopStats } from '@/lib/utils';

export class Troop {
  level: string;
  count: number;
  statsPercent: { [key: string]: number };
  baseStats: { [key: string]: number };
  modifiedStats: { [key: string]: number };

  constructor(
    troopType: string,
    level: string,
    count: number,
    statsPercent: { [key: string]: number }
  ) {
    this.level = level;
    this.count = count;
    this.statsPercent = statsPercent;
    this.baseStats = getTroopStats(troopType, level);
    this.modifiedStats = this.applyPercentModifiers();
  }

  applyPercentModifiers() {
    return {
      power: this.baseStats.power,
      attack: this.baseStats.attack * (1 + (this.statsPercent.attack || 0) / 100),
      defense: this.baseStats.defense * (1 + (this.statsPercent.defense || 0) / 100),
      lethality: this.baseStats.lethality * (1 + (this.statsPercent.lethality || 0) / 100),
      health: this.baseStats.health * (1 + (this.statsPercent.health || 0) / 100),
    };
  }

  totalStats() {
    return Object.fromEntries(
      Object.entries(this.modifiedStats).map(([key, value]) => [key, value * this.count])
    );
  }
}

export class Infantry extends Troop {
  constructor(level: string, count: number, statsPercent: { [key: string]: number }) {
    super('Infantry', level, count, statsPercent);
  }
}
export class Lancer extends Troop {
  constructor(level: string, count: number, statsPercent: { [key: string]: number }) {
    super('Lancer', level, count, statsPercent);
  }
}
export class Marksmen extends Troop {
  constructor(level: string, count: number, statsPercent: { [key: string]: number }) {
    super('Marksmen', level, count, statsPercent);
  }
}
