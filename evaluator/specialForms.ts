import { evaluate } from '.'
import { Expression, WordExpression } from '../types'

export const specialForms = Object.create(null)

specialForms.if = (args: Expression[], scope): any => {
  if (args.length !== 3) {
    throw new SyntaxError('Wrong number of args to if')
  }

  if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope)
  }

  return evaluate(args[2], scope)
}

specialForms.while = (args: Expression[], scope): boolean => {
  if (args.length !== 2) {
    throw new SyntaxError('Wrong number of args to while')
  }

  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope)
  }

  return false
}

specialForms.do = (args: Expression[], scope): any => {
  let value: any

  for (let arg of args) {
    value = evaluate(arg, scope)
  }

  return value
}

specialForms.define = (args: Expression[], scope): any => {
  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Incorrect use of define')
  }

  const value = evaluate(args[1], scope)
  const word = args[0] as WordExpression

  scope[word.name] = value
  return value
}

specialForms.set = (args: Expression[], scope): any => {
  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Incorrect use of set')
  }

  const valName: string = (args[0] as WordExpression).name
  const value: string | number | Expression = evaluate(args[1], scope)

  for (let loopScope = scope; loopScope; loopScope = Object.getPrototypeOf(loopScope)) {
    if (Object.prototype.hasOwnProperty.call(loopScope, valName)) {
      loopScope[valName] = value
      return value
    }
  }

  throw new ReferenceError(`Tried setting an undefined variable: ${valName}`)
}

specialForms.fun = (args: Expression[], scope): Function => {
  if (!args.length) {
    throw new SyntaxError('Functions need a body')
  }

  const body = args[args.length - 1]
  const params = args.slice(0, args.length - 1).map((expr: Expression): string => {
    if (expr.type !== 'word') {
      throw new SyntaxError('Parameter names must be words')
    }

    return expr.name
  })

  return function (): any {
    if (arguments.length !== params.length) {
      throw new TypeError(`Expected ${params.length} arguments, got ${arguments.length}`)
    }

    const localScope = Object.create(scope)

    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i]
    }

    return evaluate(body, localScope)
  }
}
