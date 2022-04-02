export function paramSerializer(key: string, values?: string | string[]) {
  if (typeof values === 'string') {
    return () => `${key}=${values}`;
  }

  if (!values) {
    return undefined;
  }

  if (!values.length) {
    return '';
  }

  return () => values.map((value) => `${key}=${value}`).join('&');
}
