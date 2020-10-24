export type Expression = NumberExpression | StringExpression | WordExpression | FunctionCallExpression | PropertyExpression

export type NumberExpression = {
  /**
   * Either the value of a string or a number.
   */
  value: number

  /**
   * The type of expression this is.
   */
  type: 'value'
}

export type StringExpression = {
  /**
   * Either the value of a string or a number.
   */
  value: string

  /**
   * The type of expression this is.
   */
  type: 'value'
}

export type WordExpression = {
  /**
   * The value of the word in an expression of type `word`.
   */
  name: string

  /**
   * The type of expression this is.
   */
  type: 'word'
}

export type FunctionCallExpression = {
  /**
   * The `Expression` in a function.
   */
  operator: Expression

  /**
   * The arguments in a function.
   */
  args: Array<Expression>

  /**
   * The type of expression this is.
   */
  type: 'apply'
}

export type PropertyExpression = {
  /**
   * The word we are getting the property from.
   */
  operator: Expression

  /**
   * The property we want from it.
   */
  arg: Expression

  /**
   * The type of expression this is.
   */
  type: 'property'
}
