/** Presentation only: never use this to identify or open files. */
export function displayPath(value: string | undefined): string {
  return (value ?? '').replace(/\\\\\?\\UNC\\/gi, '\\\\').replace(/\\\\\?\\/g, '');
}
