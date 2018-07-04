export default interface Scope {
  /**
   * The value of a scope's true boolean.
   */
  true: boolean,
  /**
   * The value of a scope's false boolean.
   */
  false: boolean,
  /**
   * The value of a scope's print function.
   */
  print: Function,
  array: Function,
  sizeof: Function,
  element: Function
}
