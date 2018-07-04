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
  /**
   * The value of a scope's array function.
   */
  array: Function,
  /**
   * The value of a scope's sizeof function.
   */
  sizeof: Function,
  /**
   * The value of a scope's element function.
   */
  element: Function
}
