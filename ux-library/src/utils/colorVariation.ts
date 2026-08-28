type CssVariableMap = Record<`--${string}`, string>;

export function colorVariation(
  variablePrefix: string,
  mainColor: string,
  baseColor: string,
): CssVariableMap {
  const cssVariables: CssVariableMap = {
    [`--${variablePrefix}`]: mainColor,
    [`--${variablePrefix}-05`]: `color-mix(in srgb, var(--${variablePrefix}), ${baseColor} 95%)`,
  };

  for (let i = 1; i <= 9; i += 1) {
    const baseColorPercentage = 100 - i * 10;
    cssVariables[`--${variablePrefix}-${i}`] =
      `color-mix(in srgb, var(--${variablePrefix}), ${baseColor} ${baseColorPercentage}%)`;
  }

  return cssVariables;
}
