import { skipSpace } from '../util'
import { parseExpression } from '.'
import { Expression } from '../types'

/**
 * Checks if the last expression was an assignment and parses it.
 * @param expr The expression to check for functions.
 * @param program The rest of the program.
 */
export function parseAnyAssignments (expr: Expression, program: string): { expr: Expression, rest: string } {
  program = skipSpace(program)

  if (program[0] !== '=') {
    return { expr, rest: program }
  }

  if (expr.type !== 'word') {
    throw new SyntaxError('Expected variable name before assignment')
  }

  expr = { type: 'apply', operator: { type: 'word', name: 'set' }, args: [ expr ] }
  program = skipSpace(program.slice(1))

  const arg = parseExpression(program)

  expr.args.push(arg.expr)
  program = skipSpace(arg.rest)

  return parseAnyAssignments(expr, program)
}
