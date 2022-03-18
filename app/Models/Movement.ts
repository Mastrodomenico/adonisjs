import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Redis from '@ioc:Adonis/Addons/Redis'
import Account from 'App/Models/Account'

export default class Movement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public account_id: number

  @belongsTo(() => Account, { foreignKey: 'account_id', localKey: 'id' })
  public account: BelongsTo<typeof Account>

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeCreate()
  public static async updateBalanceInCache(movement: Movement) {
    await Redis.hincrby(`account:${movement.account_id}`, 'balance', movement.value)
  }
}
