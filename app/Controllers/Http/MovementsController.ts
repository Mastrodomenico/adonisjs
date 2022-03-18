import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MovementRepository } from 'App/Repositories/MovementRepository'
import CreditMovementValidator from 'App/Validators/CreditMovementValidator'
import Redis from '@ioc:Adonis/Addons/Redis'
import DebitMovementValidator from 'App/Validators/debitMovementValidator'
import TransferMovementValidator from 'App/Validators/transferMovementValidator'

export default class MovementsController {
  public repository: MovementRepository

  constructor() {
    this.repository = new MovementRepository()
  }

  public async credit({ request }: HttpContextContract) {
    const payload = await request.validate(CreditMovementValidator)
    return this.repository.credit(payload)
  }

  public async debit({ request }: HttpContextContract) {
    const payload = await request.validate(DebitMovementValidator)
    return this.repository.debit(payload)
  }

  public async transfer({ request }: HttpContextContract) {
    const payload = await request.validate(TransferMovementValidator)

    await this.repository.debit({
      value: payload.value,
      account_id: payload.account_id_source,
    })

    return this.repository.credit({
      value: payload.value,
      account_id: payload.account_id_destination,
    })
  }

  public async balance({ params }: HttpContextContract) {
    return {
      value: parseFloat((await Redis.hget(`account:${params.id}`, 'balance')) ?? '0'),
    }
  }
}
