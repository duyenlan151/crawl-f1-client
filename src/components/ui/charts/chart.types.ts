import { IRaceData } from '@/models/chart';

// chart.types.ts
export interface ChartData {
  name: string;
  count: number;
  time?: string;
  car?: string;
}

export interface ChartProps {
  data: IRaceData[];
  type: 'bar' | 'pie' | 'line';
  category: 'winner' | 'car' | 'month' | 'race_time';
}

export interface BarLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
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
      time?: string;
      car?: string;
      category?: string;
    };
  }>;
}
