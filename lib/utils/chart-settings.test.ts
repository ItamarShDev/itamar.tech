import { describe, expect, test } from 'bun:test';
import { 
  themedRadarSettings, 
  themedLineSettings, 
  type ChartTheme 
} from './chart';

describe('Chart Settings Utilities', () => {
  const mockTheme: ChartTheme = {
    charts: '#123456',
    text: '#ffffff',
    headerText: '#cccccc',
  };

  describe('themedRadarSettings', () => {
    test('returns correct radar chart settings with theme applied', () => {
      const title = 'Test Radar Chart';
      const settings = themedRadarSettings(title, mockTheme);

      expect(settings).toMatchObject({
        maintainAspectRatio: false,
        aspectRatio: 1,
        tooltips: { enabled: false },
        plugins: {
          title: {
            display: true,
            text: title,
            color: mockTheme.text,
          },
          legend: { display: false },
        },
      });

      // Check scales configuration
      expect(settings.scales?.r).toBeDefined();
      expect(settings.scales?.r.ticks).toEqual({
        display: false,
        maxTicksLimit: 1,
      });
      expect(settings.scales?.r.pointLabels).toEqual({
        color: mockTheme.text,
      });
    });
  });

  describe('themedLineSettings', () => {
    test('returns correct line chart settings with theme applied', () => {
      const title = 'Test Line Chart';
      const settings = themedLineSettings(title, mockTheme);

      expect(settings).toMatchObject({
        maintainAspectRatio: false,
        aspectRatio: 1,
        spanGaps: false,
        plugins: {
          title: {
            display: true,
            text: title,
            color: mockTheme.text,
          },
          legend: {
            position: 'top',
            fullWidth: true,
            labels: {
              boxWidth: 5,
              color: mockTheme.text,
            },
          },
        },
        tooltips: { enabled: false },
      });

      // Check scales configuration
      expect(settings.scales?.xAxis).toBeDefined();
      expect(settings.scales?.xAxis.ticks).toEqual({
        color: mockTheme.text,
      });
      expect(settings.scales?.xAxis.gridLines).toEqual({
        drawTicks: false,
        drawOnChartArea: false,
        color: mockTheme.headerText,
      });

      expect(settings.scales?.yAxis).toBeDefined();
      expect(settings.scales?.yAxis).toMatchObject({
        display: true,
        ticks: { display: false },
        gridLines: {
          drawTicks: false,
          drawOnChartArea: false,
          color: mockTheme.headerText,
        },
      });
    });
  });
});
