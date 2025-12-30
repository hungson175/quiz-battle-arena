// tests/gridConfig.test.js
// TDD: RED phase - Write failing tests first

import { GridConfig } from '../src/utils/GridConfig.js';

describe('GridConfig', () => {
  let config;

  beforeEach(() => {
    config = new GridConfig();
  });

  describe('Grid Dimensions', () => {
    test('should have 3 lanes', () => {
      expect(config.lanes).toBe(3);
    });

    test('should have 9 columns', () => {
      expect(config.columns).toBe(9);
    });

    test('should have correct cell dimensions', () => {
      expect(config.cellWidth).toBeGreaterThan(0);
      expect(config.cellHeight).toBeGreaterThan(0);
    });
  });

  describe('Grid Positioning', () => {
    test('should calculate cell center position from grid coordinates', () => {
      const pos = config.getCellCenter(0, 0);
      expect(pos).toHaveProperty('x');
      expect(pos).toHaveProperty('y');
      expect(typeof pos.x).toBe('number');
      expect(typeof pos.y).toBe('number');
    });

    test('should return different positions for different cells', () => {
      const pos00 = config.getCellCenter(0, 0);
      const pos11 = config.getCellCenter(1, 1);
      expect(pos00.x).not.toBe(pos11.x);
      expect(pos00.y).not.toBe(pos11.y);
    });

    test('should convert screen position to grid coordinates', () => {
      const pos = config.getCellCenter(1, 2);
      const gridCoords = config.screenToGrid(pos.x, pos.y);
      expect(gridCoords.lane).toBe(1);
      expect(gridCoords.col).toBe(2);
    });
  });

  describe('Grid Validation', () => {
    test('should validate coordinates within bounds', () => {
      expect(config.isValidCell(0, 0)).toBe(true);
      expect(config.isValidCell(2, 8)).toBe(true);
      expect(config.isValidCell(3, 0)).toBe(false); // lane out of bounds
      expect(config.isValidCell(0, 9)).toBe(false); // col out of bounds
      expect(config.isValidCell(-1, 0)).toBe(false);
    });
  });

  describe('House Zone', () => {
    test('should define house zone on left edge (column 0)', () => {
      expect(config.houseColumn).toBe(0);
    });

    test('should check if position is in house zone', () => {
      expect(config.isHouseZone(0, 0)).toBe(true);
      expect(config.isHouseZone(1, 0)).toBe(true);
      expect(config.isHouseZone(0, 1)).toBe(false);
    });
  });

  describe('Plantable Area', () => {
    test('should not allow planting in house zone (column 0)', () => {
      expect(config.isPlantable(0, 0)).toBe(false);
      expect(config.isPlantable(1, 0)).toBe(false);
    });

    test('should allow planting in columns 1-8', () => {
      expect(config.isPlantable(0, 1)).toBe(true);
      expect(config.isPlantable(2, 8)).toBe(true);
    });
  });
});
