import { DataTypes, Model, Sequelize } from 'sequelize'
import { randomUUID } from 'node:crypto'

class Branch extends Model {
  public id: string
  public name: string
  public address: string
  public complement: string
  public city: string
  public state: string
  public country: string
  public postalCode: string
  public enabled: boolean
  public comingSoon: boolean

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        complement: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        postalCode: DataTypes.STRING,
        enabled: DataTypes.BOOLEAN,
        comingSoon: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'branches',
        tableName: 'branches',
        hooks: {
          beforeSave: (item: Branch) => {
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

export default Branch
