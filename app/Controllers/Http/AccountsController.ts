import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AccountRepository } from 'App/Repositories/AccountRepository'
import CreateAccountValidator from 'App/Validators/CreateAccountValidator'
import UpdateAccountValidator from 'App/Validators/UpdateAccountValidator'

export default class AccountsController {
  public repository: AccountRepository

  constructor() {
    this.repository = new AccountRepository()
  }

  public async index({}: HttpContextContract) {
    return this.repository.all()
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateAccountValidator)
    return this.repository.create(payload)
  }

  public async show({ params }: HttpContextContract) {
    return this.repository.find(params.id)
  }

  public async update({ request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateAccountValidator)
    return this.repository.update(params.id, payload)
  }

  public async destroy({ params }: HttpContextContract) {
    return this.repository.delete(params.id)
  }

  public async movement({ params }: HttpContextContract) {
    return this.repository.movements(params.id)
  }
}
