import { skipSpace } from '../util'
import { parseExpression } from '.'
import { evaluate } from '../evaluator'
import { topScope } from '../scopes'

/**
 * Parses and evaluates a program starting in a fresh scope.
 * @param program The program, written in Egg, to be parsed and ran.
 */
export function parseAndRun (program: string): any {
  const { expr, rest } = parseExpression(program)

  if (skipSpace(rest).length > 0) {
    throw new SyntaxError('Unexpected text after program')
  }

  return evaluate(expr, Object.create(topScope))
}
