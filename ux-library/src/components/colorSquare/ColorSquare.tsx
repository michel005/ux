import style from './ColorSquare.module.scss';
import type { CSSProperties } from 'react';

export interface ColorSquareProps {
  color: string;
}

export function ColorSquare(props: ColorSquareProps) {
  return (
    <span
      className={style.colorSquare}
      style={
        {
          '--color-square-color': props.color,
        } as CSSProperties
      }
    />
  );
}
