/** Render meaningful values instead of passing a bare "other" token to sales. */
export function displaySpecification(value?: string, otherValue?: string): string {
  if (!value) return '';
  if (value === 'other') {
    return otherValue?.trim() ? otherValue.trim() : 'Other (not specified)';
  }
  if (value === 'not-sure') return 'Not Sure';
  return value;
}
