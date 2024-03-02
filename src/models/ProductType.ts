import { dbType } from '@database/index'
import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class ProductType extends Model {
  public id!: string
  public name!: string
  public order!: number
  public showOnHome!: boolean
  public enabled!: boolean

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        order: DataTypes.INTEGER,
        showOnHome: DataTypes.BOOLEAN,
        enabled: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'productTypes',
        tableName: 'productTypes',
        hooks: {
          beforeSave: (item: ProductType) => {
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

export default ProductType
