export const comparePaths = (path1: string, path2: string): boolean => {
  return (path1.charAt(0) === '/' ? path1 : '/' + path1)
    === (path2.charAt(0) === '/' ? path2 : '/' + path2)
}
