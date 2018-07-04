export default interface Expression {
  /**
   * The value of the word in an expression of type `word`.
   */
  name?: string,
  /**
   * Either the value of a string or a number.
   */
  value?: string|number,
  /**
   * The `Expression` in a function.
   */
  operator?: Expression,
  /**
   * The arguments in a function.
   */
  args?: Array<Expression>,
  /**
   * The type of expression this is. Either `value`, `word`, or `apply`.
   */
  type: string
}
