/**
 * Skips whitespace and comments starting with `#` in a string.
 * @param string The string to skip things in.
 */
export default function skipSpace(string: string): string {
  return string.slice(/^(\s|#.*)*/.exec(string)[0].length);
}
