export function switchCase<T extends string, R>(value: T, cases: Partial<Record<T, R>>, defaultCase: R): R {
  if (value in cases) {
    return cases[value] as R;
  }

  return defaultCase;
}
