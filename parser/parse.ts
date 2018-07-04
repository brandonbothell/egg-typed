import skipSpace from '../util/skipSpace';
import parseExpression from './parseExpression';
import evaluate from '../evaluator/evaluate';
import { topScope } from '../scopes';

export default function parse(program): any {
  let {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return evaluate(expr, Object.create(topScope));
}
