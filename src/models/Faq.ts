import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class Faq extends Model {
  public id: string
  public language: string
  public type: string
  public title: string
  public description: string

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        language: DataTypes.STRING,
        type: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'faqs',
        tableName: 'faqs',
        hooks: {
          beforeSave: (item: Faq) => {
            if (!item.id) {
              item.id = randomUUID()
            }
          },
        },
      },
    )

    return this
  }

  static associate() {}
}

export default Faq
