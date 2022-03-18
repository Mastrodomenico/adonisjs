import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DebitMovementValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    value: schema.number([
      rules.accountValueCannotBeNegative(this.ctx.request.input('account_id')),
    ]),
    account_id: schema.string({}, [rules.exists({ table: 'accounts', column: 'id' })]),
  })

  public messages = {
    'account_id.exists': 'Account must exist',
  }
}
