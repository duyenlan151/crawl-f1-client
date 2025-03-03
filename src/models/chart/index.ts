// models/chart.ts

// Chart types
export type ChartType = 'bar' | 'pie' | 'line';

// Chart categories
export type ChartCategory =
  | 'winner'
  | 'car'
  | 'month'
  | 'race_time'
  | 'laps'
  | 'team'
  | 'grandPrix';

// Race data interface (based on transformDataForChart usage)
export interface IRaceData {
  winner: string;
  car: string;
  grandPrix: string;
  laps: string; // Assuming string from data, converted to number in transform
  time: string; // e.g., "hh:mm:ss.sss"
  date: string; // For month calculation
  [key: string]: unknown; // For flexibility
}

// Chart props
export interface ChartProps {
  data: IRaceData[];
  type: ChartType;
  category: ChartCategory;
  title: string;
}

// Transformed chart data (output of transformDataForChart)
export interface ChartData {
  name: string;
  count: number;
}

// Component props (unchanged from previous refactor)
export interface BarLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number | string;
}

export interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      name: string;
      category: string;
      car?: string;
      time?: string;
      [key: string]: unknown;
    };
  }>;
}
