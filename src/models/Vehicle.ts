import { dbType } from '@database/index'
import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class Vehicle extends Model {
  public id!: string
  public productModelId!: string
  public year!: number
  public version!: string
  public color!: string
  public doors!: number
  public transmission!: string
  public fuel!: string
  public mileage!: number
  public enabled!: boolean

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        productModelId: DataTypes.UUID,
        year: DataTypes.INTEGER,
        version: DataTypes.STRING,
        color: DataTypes.STRING,
        doors: DataTypes.INTEGER,
        transmission: DataTypes.STRING,
        fuel: DataTypes.STRING,
        mileage: DataTypes.INTEGER,
        enabled: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'vehicles',
        tableName: 'vehicles',
        hooks: {
          beforeSave: (item: Vehicle) => {
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
    this.belongsTo(models.ProductModel, {
      foreignKey: 'productModelId',
      as: 'productModels',
    })
    this.hasMany(models.Image, {
      foreignKey: 'relatedId',
      as: 'images',
    })
  }
}

export default Vehicle
