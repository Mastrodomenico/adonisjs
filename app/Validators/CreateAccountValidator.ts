import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAccountValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cpf: schema.string({}, [rules.unique({ table: 'accounts', column: 'cpf' })]),
    name: schema.string(),
  })

  public messages = {
    'cpf.unique': 'cpf already registered',
  }
}
