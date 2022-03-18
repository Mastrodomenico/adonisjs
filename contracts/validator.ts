declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    accountValueCannotBeNegative(accountId: number): Rule
  }
}
