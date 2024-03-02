import { dbType } from '@database/index'
import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class VehicleOffer extends Model {
  public id!: string
  public vehicleId!: string
  public description!: string
  public price!: number
  public fullPrice!: number
  public defaultPeriod!: number
  public minPeriod!: number
  public maxPeriod!: number
  public upfrontPayment!: number
  public enabled!: boolean
  public order!: number
  public showOnHome!: boolean
  public homepageGroup!: string

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        vehicleId: DataTypes.UUID,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        fullPrice: DataTypes.DECIMAL(10, 2),
        defaultPeriod: DataTypes.INTEGER,
        minPeriod: DataTypes.INTEGER,
        maxPeriod: DataTypes.INTEGER,
        upfrontPayment: DataTypes.DECIMAL(10, 2),
        enabled: DataTypes.BOOLEAN,
        order: DataTypes.INTEGER,
        showOnHome: DataTypes.BOOLEAN,
        homepageGroup: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'vehicleOffers',
        tableName: 'vehicleOffers',
        hooks: {
          beforeSave: (item: VehicleOffer) => {
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
    this.belongsTo(models.Vehicle, {
      foreignKey: 'vehicleId',
      as: 'vehicles',
    })
  }
}

export default VehicleOffer
