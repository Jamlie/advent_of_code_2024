export function stringArrayToIntArray(arr: string[]) {
  return arr.filter(Boolean).map((v) => +v);
}
