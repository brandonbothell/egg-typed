import { skipSpace } from '../util'
import { parseAnyFunctionCall, parseAnyProperties, parseAnyAssignments, parseAnyDeclarations } from '.'
import { Expression } from '../types'

/**
 * Parses a single expression and any subexpressions.
 * @param program The program containing the expression to parse.
 * @param dotProperty Whether or not we're parsing the right-hand side of a dot property expression.
 */
export function parseExpression (program: string, dotProperty: boolean = false) {
  program = skipSpace(program)

  const stringRegex = [ /^"([^"]*)"/, /^'([^']*)'/ ]
  const numberRegex = /^\d+\b/
  const wordRegex = /^[^\s(),#"\[\].]+/

  let match: RegExpExecArray
  let expr: Expression

  if (match = stringRegex[0].exec(program)) {
    expr = { type: 'value', value: match[1] }
  } else if (match = stringRegex[1].exec(program)) {
    expr = { type: 'value', value: match[1] }
  } else if (match = numberRegex.exec(program)) {
    expr = { type: 'value', value: Number(match[0]) }
  } else if (match = wordRegex.exec(program)) {
    if (!dotProperty) {
      expr = { type: 'word', name: match[0] }
    } else {
      expr = { type: 'value', value: match[0] }
    }
  } else {
    throw new SyntaxError('Unexpected syntax: ' + program)
  }

  const parsedProperties = parseAnyProperties(expr, program.slice(match[0].length))
  const parsedAssignments = parseAnyAssignments(parsedProperties.expr, parsedProperties.rest)
  const parsedDeclarations = parseAnyDeclarations(parsedAssignments.expr, parsedAssignments.rest)

  // if we're dealing with a dot property, don't try to parse the property name as a function call, we instead use the property value.
  if (dotProperty) {
    return parsedDeclarations
  }

  return parseAnyFunctionCall(parsedDeclarations.expr, parsedDeclarations.rest)
}
