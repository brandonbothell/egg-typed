/**
 * Skips whitespace and comments starting with `#` in a string.
 * @param string The string to skip things in.
 */
export function skipSpace (str: string): string {
  return str.slice(/^(\s|#.*)*/.exec(str)[0].length)
}
