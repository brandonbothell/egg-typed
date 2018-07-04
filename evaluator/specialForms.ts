import evaluate from './evaluate';
import Expression from '../types/Expression';
import Scope from '../types/Scope';
import { ExecOptionsWithBufferEncoding } from 'child_process';

export const specialForms = Object.create(null);

specialForms.if = (args: Expression[], scope: Scope): any => {
  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args: Expression[], scope: Scope): boolean => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  return false;
};

specialForms.do = (args: Expression[], scope: Scope): any => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

specialForms.define = (args: Expression[], scope: Scope): any => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

specialForms.set = (args: Expression[], scope: Scope): any => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of set");
  }
  let valName: string = args[0].name;
  let value: string|number|Expression = evaluate(args[1], scope);
  for (let loopScope = scope; loopScope; loopScope = Object.getPrototypeOf(loopScope)) {
    if (Object.prototype.hasOwnProperty.call(loopScope, valName)) {
      loopScope[valName] = value;
      return value;
    }
  }
  throw new ReferenceError(`Tried setting an undefined variable: ${valName}`);
};

specialForms.fun = (args: Expression[], scope: Scope): Function => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map((expr): string => {
    if (expr.type != "word") {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function(): any {
    if (arguments.length != params.length) {
      throw new TypeError("Wrong number of arguments");
    }
    let localScope: Scope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  };
};
