import { describe, expect, test } from 'bun:test';
import { randomChartData, themedDatasets } from './chart';
import type { ChartTheme } from './chart';

describe('Chart Utilities', () => {
  describe('randomChartData', () => {
    test('returns an object with the correct structure', () => {
      const result = randomChartData(1);
      
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('labels');
      expect(result).toHaveProperty('values');
      
      expect(Array.isArray(result.labels)).toBe(true);
      expect(Array.isArray(result.values)).toBe(true);
    });

    test('includes the provided id in the title', () => {
      const id = 42;
      const result = randomChartData(id);
      
      expect(result.title).toBe(`Chart #${id}`);
    });

    test('returns the expected number of data points', () => {
      const result = randomChartData(1);
      
      // Should have 5 time periods
      expect(result.labels).toHaveLength(5);
      
      // Should have 4 datasets (Learning, Mingeling, Involvement, Contribution)
      expect(result.values).toHaveLength(4);
      
      // Each dataset should have 5 data points
      result.values.forEach(dataset => {
        expect(dataset.data).toHaveLength(5);
      });
    });

    test('generates random data between 0 and 100', () => {
      const result = randomChartData(1);
      
      result.values.forEach(dataset => {
        dataset.data.forEach(value => {
          expect(value).toBeGreaterThanOrEqual(0);
          expect(value).toBeLessThanOrEqual(100);
        });
      });
    });
  });
});
