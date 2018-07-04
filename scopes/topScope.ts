import Scope from "../types/Scope";
import Expression from "../types/Expression";

export const topScope: Scope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = (...values) => {
  let valuesString = ""
  for (let i = 0; i < values.length; i++) {
    valuesString += values[i]
  }
  console.log(valuesString);
  return valuesString;
};

topScope.array = (...items) => {
  return items
}

topScope.sizeof = (array: any[]) => {
  return array.length;
};

topScope.element = (array: any[], index: number) => {
  return array[index];
};
