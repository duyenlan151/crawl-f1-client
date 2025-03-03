import { ReactNode } from 'react';

export interface Column<T> {
  label: string;
  key: keyof T | string;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage?: number;
  emptyMessage?: string;
  invalidDataMessage?: string;
  rowKey: keyof T;
}

export const ITEMS_PER_PAGE_DEFAULT = 20;
