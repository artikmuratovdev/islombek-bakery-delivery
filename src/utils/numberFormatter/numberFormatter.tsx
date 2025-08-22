export function formatNumberWithSpaces(num: string | number): string {
  return Number(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
