import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import Database, { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database'

export class Repository {
  private model: LucidModel
  public db: DatabaseQueryBuilderContract

  constructor(model: LucidModel) {
    this.model = model
    this.db = Database.query()
  }

  public all() {
    return this.model.query()
  }

  public find(id: number) {
    return this.model.findOrFail(id)
  }

  public create(model) {
    return this.model.create(model)
  }

  public findBy(column: string, value: string) {
    return this.model.findByOrFail(column, value)
  }

  public async update(id: number, model) {
    await this.model.query().where('id', id).update(model)
    return this.find(id)
  }

  public async delete(id: number) {
    const resource = await this.model.findOrFail(id)
    return await resource.delete()
  }
}
