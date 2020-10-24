import { skipSpace } from '../util'
import { parseExpression, parseDotProperty } from '.'
import { Expression } from '../types'

/**
 * Checks if the last expression was getting a property, and parses the prop.
 * @param expr The expression to check for properties.
 * @param program The rest of the program.
 */
export function parseBracketProperty (expr: Expression, program: string): {expr: Expression, rest: string} {
  program = skipSpace(program)

  if (program[0] !== '[') {
    // not a bracket property; try the dot property
    return parseDotProperty(expr, program)
  }

  program = skipSpace(program.slice(1))
  expr = { type: 'property', operator: expr, arg: null }

  const arg = parseExpression(program)

  expr.arg = arg.expr
  program = skipSpace(arg.rest)

  if (program[0] !== ']') {
    throw new SyntaxError("Expected ']'")
  }

  return parseBracketProperty(expr, program.slice(1))
}
