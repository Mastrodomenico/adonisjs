import { Repository } from 'App/Repositories/Repository'
import Account from 'App/Models/Account'

export class AccountRepository extends Repository {
  constructor() {
    super(Account)
  }

  public async movements(account_id: string) {
    let movements = (await Account.query().where('id', account_id).preload('movements').first())!
      .movements

    let balance = 0
    movements.map((e) => {
      balance += e.value
    })

    return {
      ...(await Account.find(account_id))?.$attributes,
      movements: movements,
      balance: balance,
    }
  }
}
