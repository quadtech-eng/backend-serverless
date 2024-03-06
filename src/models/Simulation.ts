import { dbType } from '@database/index'
import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class Simulation extends Model {
  public id!: string
  public vehicleOfferId!: string
  public paymentType!: string
  public upfrontPayment!: number
  public period!: number
  public formOfPayment!: string
  public email!: string
  public userId!: string
  public enabled!: boolean

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        vehicleOfferId: DataTypes.STRING,
        paymentType: DataTypes.STRING,
        upfrontPayment: DataTypes.NUMBER,
        period: DataTypes.NUMBER,
        formOfPayment: DataTypes.STRING,
        email: DataTypes.STRING,
        userId: DataTypes.STRING,
        enabled: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'simulations',
        tableName: 'simulations',
        hooks: {
          beforeSave: (item: Simulation) => {
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
    this.belongsTo(models.VehicleOffer, {
      foreignKey: 'vehicleOfferId',
      as: 'vehicleOffers',
    })
  }
}

export default Simulation
