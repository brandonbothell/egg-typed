import { skipSpace } from '../util'
import { parseExpression } from '.'
import { Expression } from '../types'

/**
 * Checks if the last expression was an declaration and parses it.
 * @param expr The expression to check for functions.
 * @param program The rest of the program.
 */
export function parseAnyDeclarations (expr: Expression, program: string): { expr: Expression, rest: string } {
  program = skipSpace(program)

  if (program.substr(0, 2) !== ':=') {
    return { expr, rest: program }
  }

  if (expr.type !== 'word') {
    throw new SyntaxError('Expected variable name before declaration')
  }

  expr = { type: 'apply', operator: { type: 'word', name: 'define' }, args: [ expr ] }
  program = skipSpace(program.slice(2))

  const arg = parseExpression(program)

  expr.args.push(arg.expr)
  program = skipSpace(arg.rest)

  return parseAnyDeclarations(expr, program)
}
