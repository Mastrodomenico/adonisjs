import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreditMovementValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    value: schema.number(),
    account_id: schema.string({}, [rules.exists({ table: 'accounts', column: 'id' })]),
  })

  public messages = {
    'account_id.exists': 'Account must exist',
  }
}
