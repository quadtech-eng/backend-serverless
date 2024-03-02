import { dbType } from '@database/index'
import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class ProductBrand extends Model {
  public id: string
  public productTypeId: string
  public name: string
  public image: string
  public order: number
  public showOnHome: boolean
  public enabled: boolean

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        productTypeId: DataTypes.UUID,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        order: DataTypes.INTEGER,
        showOnHome: DataTypes.BOOLEAN,
        enabled: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'productBrands',
        tableName: 'productBrands',
        hooks: {
          beforeSave: (item: ProductBrand) => {
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
    this.belongsTo(models.ProductType, {
      foreignKey: 'productTypeId',
      as: 'productTypes',
    })
  }
}

export default ProductBrand
