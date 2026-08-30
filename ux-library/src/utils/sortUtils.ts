import type { TableSortType } from '../hooks';
import { parse } from 'date-fns';

export class SortUtils {
  static sortString<T>(field: keyof T, direction: TableSortType<T>['direction']) {
    return (x: T, y: T) => {
      const valueX = x?.[field] || '';
      const valueY = y?.[field] || '';
      if (valueX > valueY) return direction === 'asc' ? 1 : -1;
      if (valueX < valueY) return direction === 'asc' ? -1 : 1;
      return 0;
    };
  }
  static sortDate<T>( 
    field: keyof T,
    direction: TableSortType<T>['direction'],
    format: string = 'yyyy-mm-dd',
  ) {
    return (x: T, y: T) => {
      const valueX = x?.[field] ? parse(x[field] as string, format, new Date()) : '';
      const valueY = y?.[field] ? parse(y[field] as string, format, new Date()) : '';
      if (valueX > valueY) return direction === 'asc' ? 1 : -1;
      if (valueX < valueY) return direction === 'asc' ? -1 : 1;
      return 0;
    };
  }
}
