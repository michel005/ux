import type { ReactNode } from 'react';
import style from './FieldLayout.module.scss';
import clsx from 'clsx';

export interface SharedFieldLayoutProps {
  backgroundVariant?: 'white' | 'gray';
  className?: string;
  disabled?: boolean;
  error?: ReactNode;
  info?: ReactNode;
  inputLeft?: ReactNode;
  noPaddingLeft?: boolean;
  inputRight?: ReactNode;
  noPaddingRight?: boolean;
  label?: ReactNode;
  labelFor?: string;
  optionalLabel?: string | boolean;
  width?: string | number;
}

export interface PrivateFieldLayoutProps {
  type?: 'checkbox' | 'field';
}

export interface FieldLayoutProps extends SharedFieldLayoutProps, PrivateFieldLayoutProps {
  input?: ReactNode;
}

export function FieldLayout(props: FieldLayoutProps) {
  if (props.type === 'checkbox') {
    return (
      <div
        data-background-variant={props.backgroundVariant || 'gray'}
        className={clsx(style.fieldLayout, props.disabled && style.disabled, props.className)}
        style={{ width: props.width }}
      >
        {props.input && (
          <div className={style.checkboxInputContainer}>
            {props.input && <div className={style.input}>{props.input}</div>}
            {props.label && (
              <label className={style.checkboxLabel} htmlFor={props.labelFor}>
                {props.label}
                {!!props.optionalLabel && (
                  <span className={style.optional}>
                    {typeof props.optionalLabel === 'string' ? props.optionalLabel : '(Opcional)'}
                  </span>
                )}
              </label>
            )}
          </div>
        )}
        {props.error && <div className={style.error}>{props.error}</div>}
        {props.info && <div className={style.info}>{props.info}</div>}
      </div>
    );
  }

  return (
    <div
      data-background-variant={props.backgroundVariant || 'gray'}
      className={clsx(style.fieldLayout, props.disabled && style.disabled, props.className)}
      style={{ width: props.width }}
    >
      {props.label && (
        <label className={style.label} htmlFor={props.labelFor}>
          {props.label}
          {!!props.optionalLabel && (
            <span className={style.optional}>
              {typeof props.optionalLabel === 'string' ? props.optionalLabel : '(Opcional)'}
            </span>
          )}
        </label>
      )}
      {props.input && (
        <div className={style.inputContainer}>
          {props.inputLeft && (
            <div className={clsx(style.inputLeft, props.noPaddingLeft && style.noPadding)}>
              {props.inputLeft}
            </div>
          )}
          {props.input && <div className={style.input}>{props.input}</div>}
          {props.inputRight && (
            <div className={clsx(style.inputRight, props.noPaddingRight && style.noPadding)}>
              {props.inputRight}
            </div>
          )}
        </div>
      )}
      {props.error && <div className={style.error}>{props.error}</div>}
      {props.info && <div className={style.info}>{props.info}</div>}
    </div>
  );
}
