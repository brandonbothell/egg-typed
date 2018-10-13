import { skipSpace } from '../util'
import { parseExpression } from '.'
import { Expression, WordExpression } from '../types'

/**
 * Checks if the last expression was getting a property, and parses the prop.
 * @param expr The expression to check for properties.
 * @param program The rest of the program.
 */
export function parseProperty (expr: Expression, program: string): {expr: Expression, rest: string} {
  program = skipSpace(program)

  if (program[0] !== '[') {
    return { expr: expr, rest: program }
  }

  program = skipSpace(program.slice(1))
  expr = { type: 'property', operator: expr, arg: null }

  const arg = parseExpression(program)

  expr.arg = arg.expr
  program = skipSpace(arg.rest)

  if (program[0] !== ']') {
    throw new SyntaxError("Expected ']'")
  }

  return parseProperty(expr, program.slice(1))
}
