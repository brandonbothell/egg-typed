import skipSpace from '../util/skipSpace';
import parseExpression from './parseExpression';
import evaluate from '../evaluator/evaluate';
import { topScope } from '../scopes';

/**
 * Parses and evaluates a program starting in a fresh scope.
 * @param program The program, written in Egg, to be parsed and ran.
 */
export default function parse(program: string): any {
  let {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return evaluate(expr, Object.create(topScope));
}
