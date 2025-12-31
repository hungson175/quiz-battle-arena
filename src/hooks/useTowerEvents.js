// src/hooks/useTowerEvents.js
// React hook for tower selection state - communicates with Phaser

import { useState, useEffect, useCallback } from 'react';
import { selectTower } from '../systems/QuizBridge.js';

export default function useTowerEvents() {
  const [towers, setTowers] = useState({});
  const [selectedTower, setSelectedTower] = useState('BASIC');
  const [gold, setGold] = useState(300);

  useEffect(() => {
    // Get tower config from game settings when available
    const loadTowers = () => {
      if (window.GAME_SETTINGS?.TOWERS) {
        setTowers(window.GAME_SETTINGS.TOWERS);
        console.log('[useTowerEvents] Loaded tower config');
      }
    };

    // Try immediately
    loadTowers();

    // Also try after a delay (game might not be initialized yet)
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
