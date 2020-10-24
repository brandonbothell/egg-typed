import { skipSpace } from '../util'
import { parseExpression, parseBracketProperty } from '.'
import { Expression } from '../types'

/**
 * Checks if the last expression was a function, and parses all of it's parameters.
 * @param expr The expression to check for functions.
 * @param program The rest of the program.
 */
export function parseFunction (expr: Expression, program: string): { expr: Expression, rest: string } {
  program = skipSpace(program)

  if (program[0] !== '(') {
    // definitely not a function; try a bracket property
    return parseBracketProperty(expr, program)
  }

  expr = { type: 'apply', operator: expr, args: [] }
  program = skipSpace(program.slice(1))

  while (program[0] !== ')') {
    const arg = parseExpression(program)

    expr.args.push(arg.expr)
    program = skipSpace(arg.rest)

    if (program[0] === ',') {
      program = skipSpace(program.slice(1))
    } else if (program[0] !== ')') {
      throw new SyntaxError("Expected ',' or ')'")
    }
  }

  return parseFunction(expr, program.slice(1))
}