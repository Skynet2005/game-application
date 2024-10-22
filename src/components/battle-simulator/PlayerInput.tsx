// src/app/(components)/PlayerInput.tsx

import { useEffect } from 'react';
import { useTranslations } from "next-intl";

interface PlayerInputProps {
  playerNumber: number;
  name: string;
  setName: (name: string) => void;
  infantryCount: number;
  setInfantryCount: (count: number) => void;
  infantryPercentage: number | null;
  setInfantryPercentage: (percentage: number | null) => void;
  lancerCount: number;
  setLancerCount: (count: number) => void;
  lancerPercentage: number | null;
  setLancerPercentage: (percentage: number | null) => void;
  marksmenCount: number;
  setMarksmenCount: (count: number) => void;
  marksmenPercentage: number | null;
  setMarksmenPercentage: (percentage: number | null) => void;
  totalTroops: number | null;
  setTotalTroops: (count: number | null) => void;
  infantryLevel: string;
  setInfantryLevel: (level: string) => void;
  lancerLevel: string;
  setLancerLevel: (level: string) => void;
  marksmenLevel: string;
  setMarksmenLevel: (level: string) => void;
  specialBonuses: { [key: string]: number };
  setSpecialBonuses: (bonuses: { [key: string]: number }) => void;
  troopStats: {
    Infantry: { attack: number; defense: number; lethality: number; health: number };
    Lancer: { attack: number; defense: number; lethality: number; health: number };
    Marksmen: { attack: number; defense: number; lethality: number; health: number };
  };
  setTroopStats: (stats: {
    Infantry: { attack: number; defense: number; lethality: number; health: number };
    Lancer: { attack: number; defense: number; lethality: number; health: number };
    Marksmen: { attack: number; defense: number; lethality: number; health: number };
  }) => void;
  usePercentage: boolean;
  setUsePercentage: (usePercentage: boolean) => void;
  isDarkMode: boolean; // Added prop to determine if dark mode is active
}

export default function PlayerInput({
  playerNumber,
  name,
  setName,
  infantryCount,
  setInfantryCount,
  infantryPercentage,
  setInfantryPercentage,
  lancerCount,
  setLancerCount,
  lancerPercentage,
  setLancerPercentage,
  marksmenCount,
  setMarksmenCount,
  marksmenPercentage,
  setMarksmenPercentage,
  totalTroops,
  setTotalTroops,
  infantryLevel,
  setInfantryLevel,
  lancerLevel,
  setLancerLevel,
  marksmenLevel,
  setMarksmenLevel,
  specialBonuses,
  setSpecialBonuses,
  troopStats,
  setTroopStats,
  usePercentage,
  setUsePercentage,
  isDarkMode, // Added prop to determine if dark mode is active
}: PlayerInputProps) {
  const t = useTranslations("PlayerInput");

  useEffect(() => {
    if (usePercentage) {
      setInfantryCount(0);
      setLancerCount(0);
      setMarksmenCount(0);
    } else {
      setInfantryPercentage(null);
      setLancerPercentage(null);
      setMarksmenPercentage(null);
      setTotalTroops(null);
    }
  }, [
    usePercentage,
    setInfantryCount,
    setLancerCount,
    setMarksmenCount,
    setInfantryPercentage,
    setLancerPercentage,
    setMarksmenPercentage,
    setTotalTroops,
  ]);

  const handleTroopStatChange = (
    troopType: 'Infantry' | 'Lancer' | 'Marksmen',
    statKey: 'attack' | 'defense' | 'lethality' | 'health',
    value: number
  ) => {
    setTroopStats({
      ...troopStats,
      [troopType]: {
        ...troopStats[troopType],
        [statKey]: value,
      },
    });
  };

  const handleSpecialBonusChange = (bonusKey: string, value: number) => {
    setSpecialBonuses({
      ...specialBonuses,
      [bonusKey]: value,
    });
  };

  const inputClassName = `w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`;

  return (
    (<div className={`p-4 rounded ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h2 className="text-xl font-bold mb-2">Player {playerNumber}</h2>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">{t('name')}</h3>
        <input
          type="text"
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClassName}
        />
      </div>
      <div className="mb-4">
        <label className={`mr-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <input
            type="radio"
            name={`troop-input-type-player${playerNumber}`}
            checked={!usePercentage}
            onChange={() => setUsePercentage(false)}
            className="mr-2"
          />
          {t('useCount')}
        </label>
        <label className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <input
            type="radio"
            name={`troop-input-type-player${playerNumber}`}
            checked={usePercentage}
            onChange={() => setUsePercentage(true)}
            className="mr-2"
          />
          {t('usePercentage')}
        </label>
      </div>
      {usePercentage && (
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">{t('totalTroops')}</h3>
          <input
            type="number"
            value={totalTroops ?? ''}
            onChange={(e) => setTotalTroops(parseInt(e.target.value))}
            className={inputClassName}
            placeholder={t('totalTroops')}
          />
        </div>
      )}
      {['Infantry', 'Lancer', 'Marksmen'].map((troopType) => {
        const troopTypeLower = troopType.toLowerCase() as 'infantry' | 'lancer' | 'marksmen';
        const count =
          troopTypeLower === 'infantry'
            ? infantryCount
            : troopTypeLower === 'lancer'
              ? lancerCount
              : marksmenCount;
        const percentage =
          troopTypeLower === 'infantry'
            ? infantryPercentage
            : troopTypeLower === 'lancer'
              ? lancerPercentage
              : marksmenPercentage;
        const setCount =
          troopTypeLower === 'infantry'
            ? setInfantryCount
            : troopTypeLower === 'lancer'
              ? setLancerCount
              : setMarksmenCount;
        const setPercentage =
          troopTypeLower === 'infantry'
            ? setInfantryPercentage
            : troopTypeLower === 'lancer'
              ? setLancerPercentage
              : setMarksmenPercentage;
        const level =
          troopTypeLower === 'infantry'
            ? infantryLevel
            : troopTypeLower === 'lancer'
              ? lancerLevel
              : marksmenLevel;
        const setLevel =
          troopTypeLower === 'infantry'
            ? setInfantryLevel
            : troopTypeLower === 'lancer'
              ? setLancerLevel
              : setMarksmenLevel;

        return (
          <div key={troopType} className="mb-4 flex items-center">
            <h3 className={`font-bold mr-4 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>{t(troopTypeLower)}</h3>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={`p-2 border rounded w-20 mr-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            >
              <option value="T8">T8</option>
              <option value="T9">T9</option>
              <option value="T10">T10</option>
              <option value="T11">T11</option>
            </select>
            {!usePercentage ? (
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className={inputClassName}
                placeholder={t('infantryCount')}
              />
            ) : (
              <input
                type="number"
                value={percentage || ''}
                onChange={(e) => setPercentage(parseFloat(e.target.value))}
                className={inputClassName}
                placeholder={t('infantryPercentage')}
              />
            )}
          </div>
        );
      })}
      <h3 className="text-lg font-bold mt-4 mb-2">{t('troopStats')}</h3>
      {['Infantry', 'Lancer', 'Marksmen'].map((troopType) => (
        <div key={troopType} className="mb-4">
          <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>{t(troopType.toLowerCase())}</h4>
          {['attack', 'defense', 'lethality', 'health'].map((statKey) => (
            <div key={statKey} className="flex items-center mb-2">
              <label className={`block mb-1 capitalize mr-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>{t(statKey)}</label>
              <input
                type="number"
                value={
                  troopStats[troopType as 'Infantry' | 'Lancer' | 'Marksmen'][
                  statKey as 'attack' | 'defense' | 'lethality' | 'health'
                  ]
                }
                onChange={(e) =>
                  handleTroopStatChange(
                    troopType as 'Infantry' | 'Lancer' | 'Marksmen',
                    statKey as 'attack' | 'defense' | 'lethality' | 'health',
                    parseFloat(e.target.value)
                  )
                }
                className={inputClassName}
                step="any"
                inputMode="numeric"
                pattern="-?[0-9]*"
              />
            </div>
          ))}
        </div>
      ))}
      <h3 className="text-lg font-bold mt-4 mb-2">{t('specialBonuses')}</h3>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className={`text-left p-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>{t('bonusType')}</th>
            <th className={`text-left p-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>{t('value')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(specialBonuses).map((bonusKey) => (
            <tr key={bonusKey}>
              <td className={`p-2 capitalize ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>{bonusKey.replace(/_/g, ' ')}</td>
              <td className="p-2">
                <input
                  type="number"
                  value={specialBonuses[bonusKey]}
                  onChange={(e) => handleSpecialBonusChange(bonusKey, parseFloat(e.target.value))}
                  className={inputClassName}
                  step="any"
                  inputMode="numeric"
                  pattern="-?[0-9]*"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>)
  );
}
