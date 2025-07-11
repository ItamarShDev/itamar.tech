import { describe, expect, test } from 'bun:test';
import { filterItems } from './array';

describe('Array Utilities', () => {
  describe('filterItems', () => {
    const testItems = ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];
    const excludedItems = ['css']; // Using lowercase to test case insensitivity

    test('returns all items when search text is empty', () => {
      const result = filterItems(testItems, [], '');
      expect(result).toEqual(testItems);
    });

    test('filters items by search text', () => {
      const result = filterItems(testItems, [], 'script');
      expect(result).toEqual(['TypeScript', 'JavaScript']);
    });

    test('excludes items in the excluded list (case insensitive)', () => {
      // Test with exact case match
      const result1 = filterItems(testItems, ['CSS'], '');
      expect(result1).toEqual(expect.not.arrayContaining(['CSS']));
      
      // Test with different case
      const result2 = filterItems(testItems, ['css'], '');
      expect(result2).toEqual(expect.not.arrayContaining(['CSS']));
      
      // Test with multiple exclusions
      const result3 = filterItems(testItems, ['css', 'react'], '');
      expect(result3).toEqual(expect.not.arrayContaining(['CSS', 'React']));
      expect(result3).toHaveLength(3);
    });

    test('is case insensitive', () => {
      const result = filterItems(testItems, [], 'typescript');
      expect(result).toEqual(['TypeScript']);
    });

    test('returns empty array when no matches found', () => {
      const result = filterItems(testItems, [], 'nonexistent');
      expect(result).toEqual([]);
    });
  });
});
