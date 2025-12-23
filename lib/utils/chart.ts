/**
 * Types for chart theming and datasets
 */

// Define specific types for theme properties
type ThemeColor = string;

// Type for chart theme with all required properties
export interface ChartTheme {
  charts: ThemeColor;
  text: string;
  headerText: string;
  // Add other theme properties as needed
  [key: string]: ThemeColor | number | boolean | undefined;
}

// Types for chart settings
export interface ChartSettings {
  data?: {
    datasets: object[];
    labels: string[];
  };
  radarOptions?: object;
  lineOptions?: object;
}

export interface ChartAxisSettings {
  ticks: {
    color?: string;
    display?: boolean;
    maxTicksLimit?: number;
  };
  gridLines?: {
    drawTicks: boolean;
    drawOnChartArea: boolean;
    color: string;
  };
  pointLabels?: {
    color: string;
  };
  display?: boolean;
  fullWidth?: boolean;
}

export interface ChartPluginSettings {
  title?: {
    display: boolean;
    text: string;
    color: string;
  };
  legend?: {
    display?: boolean;
    position?: string;
    fullWidth?: boolean;
    labels?: {
      boxWidth?: number;
      color: string;
    };
  };
  tooltips?: {
    enabled: boolean;
  };
}



// Define a more specific type for dataset settings
export interface DatasetSettings {
  fill?: boolean;
  borderDash?: number[];
  tension?: number;
  // Add other common chart.js dataset settings as needed
}

export interface ChartDataset {
  label: string;
  data: number[];
  settings?: DatasetSettings;
  // Add other specific properties that might be needed
}

// Define a more specific type for the themed dataset
export interface ThemedDataset extends Omit<ChartDataset, 'settings'> {
  borderWidth: number;
  backgroundColor: string;
  borderColor: string;
  yAxisID: 'y';
  xAxisID: 'x';
  // Add other specific properties that might come from settings
  fill?: boolean;
  borderDash?: number[];
  tension?: number;
}

/**
 * Creates radar chart settings with theme applied
 * @param title - Chart title
 * @param theme - Theme object containing color settings
 * @returns Radar chart configuration object
 */
export function themedRadarSettings(
  title: string, 
  theme: ChartTheme
) {
  return {
    maintainAspectRatio: false,
    aspectRatio: 1,
    tooltips: {
      enabled: false,
    },
    plugins: {
      title: {
        display: true,
        text: title,
        color: theme.text,
      },
      legend: { display: false },
    },
    scales: {
      r: {
        pointLabels: { color: theme.text },
        ticks: {
          display: false,
          maxTicksLimit: 1,
        },
      },
    },
  };
}

/**
 * Creates line chart settings with theme applied
 * @param title - Chart title
 * @param theme - Theme object containing color settings
 * @returns Line chart configuration object
 */
export function themedLineSettings(
  title: string, 
  theme: ChartTheme
) {
  return {
    maintainAspectRatio: false,
    aspectRatio: 1,
    spanGaps: false,
    plugins: {
      legend: {
        position: "top",
        fullWidth: true,
        labels: {
          boxWidth: 5,
          color: theme.text,
        },
      },
      title: {
        display: true,
        text: title,
        color: theme.text,
      },
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      x: {
        ticks: { color: theme.text },
        grid: {
          drawTicks: false,
          drawOnChartArea: false,
          color: theme.headerText,
        },
      },
      y: {
        display: true,
        ticks: { display: false },
        grid: {
          drawTicks: false,
          drawOnChartArea: false,
          color: theme.headerText,
        },
      },
    },
  };
}

/**
 * Applies theme to chart datasets
 * @param values - Array of chart datasets to be themed
 * @param theme - Theme object containing color settings
 * @returns Array of themed chart datasets
 */
export function themedDatasets(
  values: ChartDataset[], 
  theme: ChartTheme
): ThemedDataset[] {
  return values.map((item, index) => {
    const [h, s, l] = hexToHSL(theme.charts, index);
    const dataset: ThemedDataset = {
      label: item.label,
      data: item.data,
      borderWidth: 2,
      backgroundColor: `hsla(${h}, ${s}%, ${l}%, 0.2)`,
      borderColor: `hsl(${h}, ${s}%, ${l}%)`,
      yAxisID: 'y',
      xAxisID: 'x',
    };
    
    if (item.settings) {
      return { ...dataset, ...item.settings };
    }
    return dataset;
  });
}

/**
 * Converts a hex color to HSL and applies an index-based variation
 * @param baseColor - Base hex color
 * @param index - Index used to vary the hue
 * @returns Tuple of [hue, saturation, lightness]
 */
function hexToHSL(baseColor: string, index: number): [number, number, number] {
  // Parse hex color to RGB
  const hex = baseColor.replace('#', '');
  const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
  const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
  const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // Declare variables separately to fix lint error
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Apply index-based variation to the hue
  h = (h * 360 + index * 137.5) % 360; // 137.5° is the golden angle
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [Math.round(h), s, l];
}

/**
 * Generates random chart data for visualization
 * @param id - A unique identifier for the chart
 * @returns An object containing chart data with labels and datasets
 */
export function randomChartData(id: number) {
  return {
    title: `Chart #${id}`,
    labels: ["1 week", "1 month", "4 months", "6 months", "1 year"],
    values: [
      {
        label: "Learning",
        data: Array(5).fill(0).map(() => Math.random() * 100),
        settings: { fill: false },
      },
      {
        label: "Mingeling",
        data: Array(5).fill(0).map(() => Math.random() * 100),
        settings: { fill: false },
      },
      {
        label: "Involvement",
        data: Array(5).fill(0).map(() => Math.random() * 100),
        settings: { fill: false },
      },
      {
        label: "Contribution",
        data: Array(5).fill(0).map(() => Math.random() * 100),
        settings: { fill: false },
      },
    ],
  };
}
