import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransferMovementValidator {
  constructor(protected ctx: HttpContextContract) {}

  public account_id = this.ctx.request.input('account_id_source') ?? 0

  public schema = schema.create({
    account_id_source: schema.string({}, [rules.exists({ table: 'accounts', column: 'id' })]),
    value: schema.number([rules.accountValueCannotBeNegative(this.account_id)]),
    account_id_destination: schema.string({}, [rules.exists({ table: 'accounts', column: 'id' })]),
  })

  public messages = {
    'account_id_source.exists': 'Account must exist',
    'account_id_destination.exists': 'Account must exist',
  }
}
