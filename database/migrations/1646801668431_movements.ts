import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Movements extends BaseSchema {
  protected tableName = 'movements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.double('value')
      table.integer('account_id').unsigned()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('account_id').references('accounts.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
