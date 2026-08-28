import type { CSSProperties, ElementType, HtmlHTMLAttributes, RefObject } from 'react';

const firstConst = {
  t: 'flex-start',
  c: 'center',
  b: 'flex-end',
};

const secondConst = {
  l: 'flex-start',
  c: 'center',
  r: 'flex-end',
};

export interface FlexProps extends HtmlHTMLAttributes<HTMLDivElement> {
  align?: 'tl' | 'tc' | 'tr' | 'cl' | 'cc' | 'cr' | 'bl' | 'bc' | 'br';
  as?: ElementType;
  gap?: string;
  grow?: number;
  margin?: string;
  padding?: string;
  type: 'row' | 'column';
  wrap?: boolean;
  ref?: RefObject<HTMLElement | null>;
  isVisible?: boolean;
}

export function Flex(props: FlexProps) {
  const { as, type, gap, grow, margin, padding, wrap, ...otherProps } = props;
  const Component = as || 'div';

  const customStyle: CSSProperties = {
    display: 'flex',
    flexDirection: type,
    flexGrow: grow,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap,
    margin,
    padding,
  };
  if (props.align) {
    const first = props.align.substring(0, 1);
    const second = props.align.substring(1, 2);

    if (props.type === 'row') {
      customStyle.alignItems = firstConst[first as keyof typeof firstConst];
      customStyle.justifyContent = secondConst[second as keyof typeof secondConst];
    }
    if (props.type === 'column') {
      customStyle.alignItems = secondConst[second as keyof typeof secondConst];
      customStyle.justifyContent = firstConst[first as keyof typeof firstConst];
    }
  }

  if (!(props.isVisible ?? true)) return null;

  return <Component {...otherProps} style={{ ...customStyle, ...otherProps.style }} />;
}

Flex.Column = (props: Omit<FlexProps, 'type'>) => <Flex {...props} type="column" />;
Flex.Row = (props: Omit<FlexProps, 'type'>) => <Flex {...props} type="row" />;
Flex.Space = () => <Flex type="row" grow={1} />;
