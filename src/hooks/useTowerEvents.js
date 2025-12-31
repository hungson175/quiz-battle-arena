// src/hooks/useTowerEvents.js
// React hook for tower selection state - communicates with Phaser

import { useState, useEffect, useCallback } from 'react';
import { selectTower } from '../systems/QuizBridge.js';
import towersConfig from '../assets/config/towers.json';

export default function useTowerEvents() {
  // Initialize with tower config directly - no need to wait for Phaser
  const [towers, setTowers] = useState(towersConfig);
  const [selectedTower, setSelectedTower] = useState('BASIC');
  const [gold, setGold] = useState(200); // Match starting money from game config

  useEffect(() => {
    // Listen for tower state updates from Phaser (can still override if needed)
    const loadTowers = () => {
      if (window.GAME_SETTINGS?.TOWERS) {
        setTowers(window.GAME_SETTINGS.TOWERS);
        console.log('[useTowerEvents] Updated tower config from Phaser');
      }
    };

    // Also sync after Phaser initializes (in case config differs)
    const timer = setTimeout(loadTowers, 1000);

    // Listen for tower state updates from Phaser
    const handleTowerState = (e) => {
      const { selectedTower: sel, gold: g, towers: t } = e.detail;
      if (sel !== undefined) setSelectedTower(sel);
      if (g !== undefined) setGold(g);
      if (t !== undefined) setTowers(t);
    };

    // Listen for UI updates (gold changes from quiz or tower placement)
    const handleUIUpdate = (e) => {
      const { money } = e.detail || {};
      if (money !== undefined) setGold(money);
    };

    window.addEventListener('tower:state', handleTowerState);
    window.addEventListener('updateUI', handleUIUpdate);

    console.log('[useTowerEvents] Event listeners registered');

    return () => {
      clearTimeout(timer);
      window.removeEventListener('tower:state', handleTowerState);
      window.removeEventListener('updateUI', handleUIUpdate);
    };
  }, []);

  // Handler for tower selection
  const handleSelectTower = useCallback((towerType) => {
    setSelectedTower(towerType);
    selectTower(towerType);  // Emit to Phaser
    console.log('[useTowerEvents] Selected tower:', towerType);
  }, []);

  return {
    towers,
    selectedTower,
    gold,
    onSelectTower: handleSelectTower,
  };
}
