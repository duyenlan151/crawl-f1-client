import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { toast } from 'react-hot-toast';

import { getF1Metadata } from '@/features/f1/services/f1Service';
import { IRaceData } from '@/models/chart';

export interface GrandPrixOption {
  name: string;
  value: string;
  dataValue: string | null; // Updated to string | null
}

export interface TypeOption {
  name: string;
  value: string;
}

export type YearOptions = string;

interface F1DataState {
  data: IRaceData[];
  loading: boolean;
  error: string | null;
  years: YearOptions[];
  types: TypeOption[];
  grandPrixOptions: GrandPrixOption[];
  year: YearOptions;
  type: string;
  grandPrix: string | null; // Updated to string | null
  setYear: (newYear: YearOptions) => void;
  setType: (newType: string) => void;
  setGrandPrix: (newGrandPrix: string | null) => void; // Updated to string | null
}

const F1DataContext = createContext<F1DataState | undefined>(undefined);

export const F1DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState({
    data: [] as IRaceData[],
    loading: false,
    error: null as string | null,
    years: [] as YearOptions[],
    types: [] as TypeOption[],
    grandPrixOptions: [] as GrandPrixOption[],
    year: '2024' as YearOptions,
    type: 'races' as string,
    grandPrix: 'All' as string,
  });

  const fetchData = useCallback(
    async (year?: YearOptions, type?: string, grandPrix?: string | null) => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const { raceData, years, types, grandPrixList } = await getF1Metadata(
          year ?? state.year,
          type ?? state.type,
          grandPrix ?? state.grandPrix,
        );
        setState((prev) => ({
          ...prev,
          data: [...raceData.data],
          years: years || prev.years,
          types: types || prev.types,
          grandPrixOptions: grandPrixList,
          year: raceData.year ?? year ?? prev.year,
          type: raceData.type ?? type ?? prev.type,
          grandPrix: raceData.grandPrix ?? grandPrix ?? 'All',
          error: null,
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: 'Failed to fetch data' }));
        toast.error('Failed to fetch data');
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [state.year, state.type, state.grandPrix],
  );

  useEffect(() => {
    if (!state.data.length && !state.loading && !state.error) {
      fetchData(state.year, state.type, state.grandPrix);
    }
  }, [fetchData, state.year, state.type, state.grandPrix]);

  const setYear = useCallback(
    (newYear: YearOptions) => {
      fetchData(newYear, 'races', 'All');
      setState((prev) => ({
        ...prev,
        year: newYear,
        type: 'races',
        grandPrix: 'All',
      }));
    },
    [fetchData],
  );

  const setType = useCallback(
    (newType: string) => {
      fetchData(state.year, newType, 'All');
      setState((prev) => ({ ...prev, type: newType, grandPrix: 'All' }));
    },
    [fetchData, state.year, state.grandPrix],
  );

  const setGrandPrix = useCallback(
    (newGrandPrix: string | null) => {
      console.log('🚀 ~ newGrandPrix:', newGrandPrix);
      fetchData(state.year, state.type, newGrandPrix);
      setState((prev) => ({ ...prev, grandPrix: newGrandPrix ?? 'All' }));
    },
    [fetchData, state.year, state.type],
  );

  const value = {
    ...state,
    setYear,
    setType,
    setGrandPrix,
  };

  return (
    <F1DataContext.Provider value={value}>{children}</F1DataContext.Provider>
  );
};

export const useF1Data = (): F1DataState => {
  const context = useContext(F1DataContext);
  if (!context) {
    throw new Error('useF1Data must be used within an F1DataProvider');
  }
  return context;
};
