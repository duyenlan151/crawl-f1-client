// hooks/useFetchF1Data.ts
import { useState, useEffect, useCallback } from 'react';

// eslint-disable-next-line no-restricted-imports
import { getF1Metadata } from '@/features/f1/services/f1Service';
import { IRaceData } from '@/models/chart';

export interface GrandPrixOption {
  name: string;
  value: string;
  dataValue: string;
}

export interface TypeOptions {
  name: string | undefined;
  value: string | undefined;
}

export type YearOptions = string | undefined;

// Define the return type explicitly
export interface FetchF1DataReturn {
  data: IRaceData[]; // Replace with actual data type if known (e.g., IRaceData[])
  loading: boolean;
  error: string | null;
  years: YearOptions[];
  types: string[];
  grandPrixOptions: GrandPrixOption[];
  year: YearOptions;
  type: string;
  grandPrix: string;
  setYear: (newYear: YearOptions) => void;
  setType: (newType: string) => void;
  setGrandPrix: (grandPrix: string) => void;
}

export const useFetchF1Data = (): FetchF1DataReturn => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null as string | null,
    years: [] as YearOptions[],
    types: [] as string[],
    grandPrixOptions: [] as GrandPrixOption[],
    year: '' as YearOptions,
    type: '' as string,
    grandPrix: '',
  });

  const fetchData = useCallback(
    async (year?: YearOptions, type?: string, grandPrix?: string) => {
      console.log('🚀 ~ fetchData ~ year:', year);

      setState((prev) => ({ ...prev, loading: true }));
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { raceData, years, types, grandPrixList } = await getF1Metadata(
          year ?? state.year,
          type ?? state?.type,
          grandPrix ?? state.grandPrix,
        );
        setState((prev) => ({
          ...prev,
          data: raceData.data,
          years: years || prev.years,
          types: types || prev.types,
          grandPrixOptions: grandPrixList,
          year: raceData.year ?? prev.year,
          type: raceData.type ?? prev.type,
          grandPrix: raceData.grandPrix || 'All',
          error: null,
        }));
      } catch {
        setState((prev) => ({ ...prev, error: 'Failed to fetch data' }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleYearChange = useCallback(
    (newYear: YearOptions) => {
      console.log('🚀 ~ useFetchF1Data ~ newYear:', newYear);
      setState((prev) => ({ ...prev, year: newYear, type: '', grandPrix: '' }));
      fetchData(newYear);
    },
    [fetchData],
  );

  const handleTypeChange = useCallback(
    (newType: string) => {
      console.log('🚀 ~ useFetchF1Data ~ newType:', newType);
      setState((prev) => ({ ...prev, type: newType, grandPrix: '' }));
      fetchData(state.year, newType);
    },
    [fetchData, state.year],
  );

  const handleGrandPrixChange = useCallback(
    (grandPrix: string) => {
      setState((prev) => ({ ...prev, grandPrix }));
      fetchData(state.year, state.type, grandPrix);
    },
    [fetchData, state.year, state.type],
  );

  return {
    ...state,
    setYear: handleYearChange,
    setType: handleTypeChange,
    setGrandPrix: handleGrandPrixChange,
  };
};
