import { dbType } from '@database/index'
import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class ProductModel extends Model {
  public id!: string
  public productBrandId!: string
  public name!: string
  public enabled!: boolean

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        productBrandId: DataTypes.UUID,
        name: DataTypes.STRING,
        enabled: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'productModels',
        tableName: 'productModels',
        hooks: {
          beforeSave: (item: ProductModel) => {
            if (!item.id) {
              item.id = randomUUID()
            }
          },
        },
      },
    )

    return this
  }

  static associate(models: dbType) {
    this.belongsTo(models.ProductBrand, {
      foreignKey: 'productBrandId',
      as: 'productBrands',
    })
  }
}

export default ProductModel
