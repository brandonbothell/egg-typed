import { skipSpace } from '../util'
import { parseExpression } from '.'
import { Expression } from '../types'

/**
 * Checks if the last expression was getting a property, and parses the prop.
 * @param expr The expression to check for properties.
 * @param program The rest of the program.
 */
export function parseDotProperty (expr: Expression, program: string): {expr: Expression, rest: string} {
  program = skipSpace(program)

  if (program[0] !== '.') {
    return { expr: expr, rest: program }
  }

  expr = { type: 'property', operator: expr, arg: null }
  program = skipSpace(program.slice(1))

  const arg = parseExpression(program, true)

  expr.arg = arg.expr
  program = skipSpace(arg.rest)

  return parseDotProperty(expr, program)
}
