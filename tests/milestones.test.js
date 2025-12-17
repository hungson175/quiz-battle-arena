import { isMilestone, getMilestoneMessage, getMilestoneIcon } from '../src/utils/Milestones.js';

describe('Milestone Detection (Sprint 2B)', () => {
  // Test 9: Milestone detection at correct intervals
  test('detects milestone at 5, 10, 15 questions', () => {
    expect(isMilestone(5)).toBeTruthy();
    expect(isMilestone(10)).toBeTruthy();
    expect(isMilestone(15)).toBeTruthy();
  });

  test('does not detect milestone at non-milestone numbers', () => {
    expect(isMilestone(1)).toBeFalsy();
    expect(isMilestone(3)).toBeFalsy();
    expect(isMilestone(6)).toBeFalsy();
    expect(isMilestone(13)).toBeFalsy();
    expect(isMilestone(14)).toBeFalsy();
  });

  test('detects milestone at 20 questions (for larger question sets)', () => {
    expect(isMilestone(20)).toBeTruthy();
  });

  test('returns correct Vietnamese message for each milestone', () => {
    expect(getMilestoneMessage(5)).toBe('Một phần tư rồi! 🎯');
    expect(getMilestoneMessage(10)).toBe('Nửa chặng đường! 🏆');
    expect(getMilestoneMessage(15)).toBe('Sắp xong rồi! 🚀');
    expect(getMilestoneMessage(20)).toBe('Về đích thôi! 🎉');
  });

  test('returns correct icon for each milestone', () => {
    expect(getMilestoneIcon(5)).toBe('🎯');
    expect(getMilestoneIcon(10)).toBe('🏆');
    expect(getMilestoneIcon(15)).toBe('🚀');
    expect(getMilestoneIcon(20)).toBe('🎉');
  });

  test('handles invalid milestone numbers gracefully', () => {
    expect(getMilestoneMessage(7)).toBe('');
    expect(getMilestoneIcon(7)).toBe('');
  });
});
