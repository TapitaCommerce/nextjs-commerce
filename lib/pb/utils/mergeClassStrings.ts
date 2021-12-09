export const mergeClassStrings = (...strs: string[]): string => {
  return strs.filter((x) => x).join(' ')
}
export default mergeClassStrings;