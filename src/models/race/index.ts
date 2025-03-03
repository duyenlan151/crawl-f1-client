// models/race.ts (example)
export interface RaceData {
  name: string;
  count: number;
  car?: string;
  time?: string;
  category?: string;
  [key: string]: unknown;
}

export type YearOptions = number;
