import skipSpace from '../util/skipSpace';
import parseExpression from "./parseExpression";
import Expression from '../types/Expression';

/**
 * Checks if the last expression was a function, and parses all of it's parameters.
 * @param expr The expression to check for functions.
 * @param program The rest of the program.
 */
export default function parseApply(expr: Expression, program: string) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return {expr: expr, rest: program};
  }

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}
