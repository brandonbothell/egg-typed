import { skipSpace } from '../util'
import { parseExpression } from '.'
import { Expression } from '../types'

/**
 * Parses any property type in an expression, and parses the property.
 * @param expr The expression to check for properties.
 * @param program The rest of the program.
 */
export function parseAnyProperties (expr: Expression, program: string): {expr: Expression, rest: string} {
  program = skipSpace(program)

  if (program[0] === '[') {
    return parseBracketProperty(expr, program)
  } else if (program[0] === '.') {
    return parseDotProperty(expr, program)
  } else {
    return { expr: expr, rest: program }
  }
}

/**
 * Parses a bracket property expression, and parses the prop.
 * @param expr The expression to check for properties.
 * @param program The rest of the program.
 */
function parseBracketProperty (expr: Expression, program: string): {expr: Expression, rest: string} {
  program = skipSpace(program.slice(1))

  expr = { type: 'property', operator: expr, arg: null }

  const arg = parseExpression(program)

  expr.arg = arg.expr
  program = skipSpace(arg.rest)

  if (program[0] !== ']') {
    throw new SyntaxError(`Expected closing ']' when accessing property '${expr.arg}' from ${expr.operator}`)
  }

  return parseAnyProperties(expr, program.slice(1))
}

/**
 * Parses a dot property expression, and parses the prop.
 * @param expr The expression to check for properties.
 * @param program The rest of the program.
 */
function parseDotProperty (expr: Expression, program: string): {expr: Expression, rest: string} {
  program = skipSpace(program.slice(1))

  expr = { type: 'property', operator: expr, arg: null }

  const arg = parseExpression(program, true)

  expr.arg = arg.expr
  program = skipSpace(arg.rest)

  return parseAnyProperties(expr, program)
}
