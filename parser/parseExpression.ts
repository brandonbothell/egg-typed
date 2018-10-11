import { skipSpace } from '../util'
import { parseApply } from '.'
import { Expression } from '../types'

/**
 * Parses a program into expressions.
 * @param program The program to parse.
 */
export function parseExpression (program: string) {
  program = skipSpace(program)

  const stringRegex = /^"([^"]*)"/
  const numberRegex = /^\d+\b/
  const wordRegex = /^[^\s(),#"]+/

  let match: RegExpExecArray
  let expr: Expression

  if (match = stringRegex.exec(program)) {
    expr = { type: 'value', value: match[1] }
  } else if (match = numberRegex.exec(program)) {
    expr = { type: 'value', value: Number(match[0]) }
  } else if (match = wordRegex.exec(program)) {
    expr = { type: 'word', name: match[0] }
  } else {
    throw new SyntaxError('Unexpected syntax: ' + program)
  }

  return parseApply(expr, program.slice(match[0].length))
}
