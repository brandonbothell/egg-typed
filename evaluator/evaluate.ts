import { specialForms } from './specialForms'
import { Expression } from '../types'

/**
 * Evaluates an expression and returns the result.
 * @param expr The expression to evaluate.
 * @param scope The scope at which to evaluate the expression.
 */
export function evaluate (expr: Expression, scope): any {
  if (expr.type === 'value') {
    return expr.value
  }

  if (expr.type === 'word') {
    if (expr.name in scope) {
      return scope[expr.name]
    }

    throw new ReferenceError(`Undefined binding: ${expr.name}`)
  }

  if (expr.type === 'apply') {
    const { operator, args } = expr

    if (operator.type === 'word' && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope)
    }

    const op = evaluate(operator, scope)

    if (typeof op === 'function') {
      return op(...args.map(arg => evaluate(arg, scope)))
    }

    throw new TypeError('Applying a non-function.')
  }
}
