import { useState } from 'react';

export interface TableSortType<K> {
  field: K;
  direction: 'asc' | 'desc';
}

export interface TableSortProps<K> {
  initialSort: TableSortType<K>;
}

export function useTableSort<T>(props: TableSortProps<T>) {
  const [sort, setSort] = useState<TableSortType<T>>(props.initialSort);

  return {
    sort,
    setSort,
  };
}
