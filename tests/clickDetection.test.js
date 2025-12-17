import { isClicked, createHitbox, isWithinVisual } from '../src/utils/ClickDetection.js';

describe('Click Detection with Grace Area (GD Rec #1)', () => {
  // Test 5: Click detection with grace area
  const visual = {
    x: 70,
    y: 250,
    width: 150,
    height: 80
  };

  const hitbox = createHitbox(visual, 10); // +10px grace area

  test('creates hitbox with correct grace area extension', () => {
    expect(hitbox.x).toBe(60);      // 70 - 10
    expect(hitbox.y).toBe(240);     // 250 - 10
    expect(hitbox.width).toBe(170);  // 150 + 20
    expect(hitbox.height).toBe(100); // 80 + 20
  });

  test('detects click inside visual boundary', () => {
    // Center of target
    expect(isClicked(145, 290, hitbox)).toBeTruthy();

    // Near corners (inside visual)
    expect(isClicked(75, 255, hitbox)).toBeTruthy();
    expect(isClicked(215, 325, hitbox)).toBeTruthy();
  });

  test('detects click in grace area (outside visual but inside hitbox)', () => {
    // Left grace area (5px outside visual)
    expect(isClicked(65, 290, hitbox)).toBeTruthy();
    expect(isWithinVisual(65, 290, visual)).toBeFalsy();

    // Right grace area (5px outside visual)
    expect(isClicked(225, 290, hitbox)).toBeTruthy();
    expect(isWithinVisual(225, 290, visual)).toBeFalsy();

    // Top grace area
    expect(isClicked(145, 245, hitbox)).toBeTruthy();
    expect(isWithinVisual(145, 245, visual)).toBeFalsy();

    // Bottom grace area
    expect(isClicked(145, 335, hitbox)).toBeTruthy();
    expect(isWithinVisual(145, 335, visual)).toBeFalsy();
  });

  test('rejects click far outside grace area', () => {
    // Too far left
    expect(isClicked(50, 290, hitbox)).toBeFalsy();

    // Too far right
    expect(isClicked(240, 290, hitbox)).toBeFalsy();

    // Too far above
    expect(isClicked(145, 230, hitbox)).toBeFalsy();

    // Too far below
    expect(isClicked(145, 350, hitbox)).toBeFalsy();
  });

  test('grace area makes target more forgiving for children', () => {
    // A click that would miss without grace area
    const missedClick = { x: 65, y: 245 };

    // Would be missed with visual boundary only
    const hitVisual = isWithinVisual(missedClick.x, missedClick.y, visual);
    expect(hitVisual).toBeFalsy();

    // But caught by grace area
    const hitWithGrace = isClicked(missedClick.x, missedClick.y, hitbox);
    expect(hitWithGrace).toBeTruthy();

    // This validates GD Rec #1: Forgiving click detection
  });
});
