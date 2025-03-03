// utils/chart-data.ts
import { IRaceData, ChartCategory, ChartData, ChartType } from '@/models/chart';

export const transformDataForChart = (
  data: IRaceData[],
  type: ChartCategory,
): ChartData[] => {
  if (!data || data.length === 0) return [];

  switch (type) {
    case 'winner':
      return Object.entries(
        data.reduce(
          (acc, race) => {
            acc[race.winner] = (acc[race.winner] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      ).map(([name, count]) => ({ name, count }));

    case 'car':
      return Object.entries(
        data.reduce(
          (acc, race) => {
            acc[race.car] = (acc[race.car] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      ).map(([name, count]) => ({ name, count }));

    case 'team':
      return Object.entries(
        data.reduce(
          (acc, race) => {
            acc[race.car] = (acc[race.car] || 0) + 1; // Assuming 'car' is a proxy for team; adjust if there's a 'team' field
            return acc;
          },
          {} as Record<string, number>,
        ),
      ).map(([name, count]) => ({ name, count }));

    case 'laps':
      return data.map((race) => ({
        name: race.grandPrix,
        count: Number(race.laps),
      }));

    case 'race_time':
      return data.map((race) => ({
        name: race.grandPrix,
        count: convertTimeToSeconds(race.time),
      }));

    case 'grandPrix':
      return Object.entries(
        data.reduce(
          (acc, race) => {
            acc[race.grandPrix] = (acc[race.grandPrix] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      ).map(([name, count]) => ({ name, count }));

    case 'month':
      return Object.entries(
        data.reduce(
          (acc, race) => {
            const month = new Date(race.date).getMonth() + 1;
            acc[month] = (acc[month] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      ).map(([name, count]) => ({ name: `Month ${name}`, count }));

    default:
      return [];
  }
};

const convertTimeToSeconds = (time: string): number => {
  const parts = time?.split(':').map(Number);
  if (parts?.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts?.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
};

export const getChartTitle = (
  type: ChartType,
  category: ChartCategory,
): string => {
  const titles: Record<ChartCategory, Record<ChartType, string>> = {
    winner: {
      bar: 'Top Race Winners',
      line: 'Race Wins Over Time',
      pie: 'Race Winners Distribution',
    },
    car: {
      bar: 'Top Performing Cars',
      line: 'Car Performance Over Time',
      pie: 'Car Performance Distribution',
    },
    month: {
      bar: 'Races Per Month',
      line: 'Races Trend by Month',
      pie: 'Races Distribution by Month',
    },
    race_time: {
      bar: 'Fastest Lap Time Distribution',
      line: 'Fastest Laps Over Time',
      pie: 'Fastest Laps Distribution',
    },
    laps: {
      bar: 'Lap Distribution',
      line: 'Laps Trend',
      pie: 'Lap Distribution',
    },
    team: {
      bar: 'Team Performance',
      line: 'Team Performance Over Time',
      pie: 'Team Distribution',
    },
    grandPrix: {
      bar: 'Grand Prix Results',
      line: 'Grand Prix Trend',
      pie: 'Grand Prix Distribution',
    },
  };
  return titles[category]?.[type] || 'Race Statistics Chart';
};
