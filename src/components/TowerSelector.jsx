// src/components/TowerSelector.jsx
// React component for tower selection - communicates with Phaser via events

import React from 'react';
import './TowerSelector.css';

export default function TowerSelector({ towers, selectedTower, onSelect, gold }) {
  if (!towers || Object.keys(towers).length === 0) {
    return (
      <div className="tower-selector">
        <h3>SELECT TOWER</h3>
        <p className="tower-loading">Loading towers...</p>
      </div>
    );
  }

  return (
    <div className="tower-selector">
      <h3>SELECT TOWER</h3>
      <div className="tower-grid">
        {Object.entries(towers).map(([type, data]) => {
          const canAfford = gold >= data.cost;
          const isSelected = selectedTower === type;

          // Tower image path: assets/tower_{type}_1.png
          const towerImagePath = `/assets/tower_${type.toLowerCase()}_1.png`;

          return (
            <button
              key={type}
              className={`tower-btn ${isSelected ? 'selected' : ''} ${!canAfford ? 'disabled' : ''}`}
              onClick={() => canAfford && onSelect(type)}
              disabled={!canAfford}
              title={`${data.name} - ${data.cost}g\n${data.description || ''}`}
            >
              <img
                src={towerImagePath}
                alt={data.name}
                className="tower-icon"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="tower-name">{data.name}</span>
              <span className={`tower-cost ${!canAfford ? 'cannot-afford' : ''}`}>
                {data.cost}g
              </span>
            </button>
          );
        })}
      </div>
      <p className="tower-hint">Click grid to place selected tower</p>
    </div>
  );
}
