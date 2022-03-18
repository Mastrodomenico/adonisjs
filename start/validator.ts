/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

validator.rule(
  'accountValueCannotBeNegative',
  async (value, [accountId], options) => {
    const balance = await Database.query()
      .from('movements')
      .where('account_id', accountId)
      .sum('value as value')
      .first()

    if (parseFloat(balance.value) - value < 0) {
      options.errorReporter.report(
        options.pointer,
        'accountValueCannotBeNegative',
        'account value cannot be negative',
        options.arrayExpressionPointer
      )
    }
  },
  () => {
    return {
      async: true,
    }
  }
)
