import { Repository } from 'App/Repositories/Repository'
import Movement from 'App/Models/Movement'

export class MovementRepository extends Repository {
  constructor() {
    super(Movement)
  }

  public account(movement_id: string) {
    return Movement.query().where('id', movement_id).preload('account').first()
  }

  public debit(movement: { value: number; account_id: string }) {
    movement.value *= -1
    return this.create(movement)
  }

  public credit(movement: { value: number; account_id: string }) {
    return this.create(movement)
  }
}
