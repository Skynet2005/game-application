// src/app/models/Player.ts

import { Troop } from './Troop';

export class Player {
  name: string;
  troops: { [key: string]: Troop };
  specialBonuses: { [key: string]: number };

  constructor(
    name: string,
    troops: { [key: string]: Troop },
    specialBonuses: { [key: string]: number } = {}
  ) {
    this.name = name;
    this.troops = troops;
    this.specialBonuses = {
      troops_attack: 0,
      troops_defense: 0,
      troops_lethality: 0,
      troops_health: 0,
      enemy_troops_attack: 0,
      enemy_troops_defense: 0,
      defender_troops_attack: 0,
      defender_troops_defense: 0,
      defender_troops_lethality: 0,
      defender_troops_health: 0,
      rally_troops_attack: 0,
      rally_troops_defense: 0,
      rally_troops_lethality: 0,
      rally_troops_health: 0,
      pet_skill_enemy_lethality_penalty: 0,
      pet_skill_enemy_health_penalty: 0,
      pet_skill_attack_bonus: 0,
      pet_skill_lethality_bonus: 0,
      ...specialBonuses,
    };
  }

  totalTroopStats() {
    let totalAttack = 0;
    let totalDefense = 0;
    let totalLethality = 0;
    let totalHealth = 0;
    let totalPower = 0;

    for (const troop of Object.values(this.troops)) {
      const stats = troop.totalStats();
      totalAttack += stats.attack;
      totalDefense += stats.defense;
      totalLethality += stats.lethality;
      totalHealth += stats.health;
      totalPower += stats.power;
    }

    totalAttack *= 1 + this.specialBonuses.troops_attack / 100;
    totalDefense *= 1 + this.specialBonuses.troops_defense / 100;
    totalLethality *= 1 + this.specialBonuses.troops_lethality / 100;
    totalHealth *= 1 + this.specialBonuses.troops_health / 100;

    return {
      attack: totalAttack,
      defense: totalDefense,
      lethality: totalLethality,
      health: totalHealth,
      power: totalPower,
    };
  }
}
