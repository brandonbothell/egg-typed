/**
 * Skips whitespace and comments starting with `#` in a string.
 * @param string The string to skip things in.
 */
export function skipSpace (str: string): string {
  str = str.slice(/^(\s|#.*)*/.exec(str)[0].length)
  return skipMultilineComment(str)
}

export function skipMultilineComment (str: string): string {
  if (str.startsWith('/*')) {
    str = str.substring(str.indexOf('*/', 2) + 2)
    return skipSpace(str)
  }

  return str
}
