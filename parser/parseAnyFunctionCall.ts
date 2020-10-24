import { skipSpace } from '../util'
import { parseExpression } from '.'
import { Expression } from '../types'

/**
 * Checks if the last expression was a function call, and parses all of it's parameters.
 * @param expr The expression to check for functions.
 * @param program The rest of the program.
 */
export function parseAnyFunctionCall (expr: Expression, program: string): { expr: Expression, rest: string } {
  program = skipSpace(program)

  if (program[0] !== '(') {
    return { expr, rest: program }
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

  return parseAnyFunctionCall(expr, program.slice(1))
}
