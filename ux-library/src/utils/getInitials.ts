export function getInitials(value: string, maxLength = 2): string {
  const words = value.trim().split(/\s+/).filter(Boolean);

  const firstWord = words[0];
  const lastWord = words[words.length - 1];

  if (!firstWord || maxLength <= 0) return '';

  if (words.length === 1) {
    return firstWord.slice(0, maxLength).toUpperCase();
  }

  return `${firstWord[0] ?? ''}${lastWord?.[0] ?? ''}`.slice(0, maxLength).toUpperCase();
}
