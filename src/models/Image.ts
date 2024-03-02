import { dbType } from '@database/index'
import { randomUUID } from 'node:crypto'
import { DataTypes, Model, Sequelize } from 'sequelize'

class Image extends Model {
  public id: string
  public relatedId: string
  public image: string
  public enabled: boolean
  public order: number

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        relatedId: DataTypes.UUID,
        image: DataTypes.STRING,
        enabled: DataTypes.BOOLEAN,
        order: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'images',
        tableName: 'images',
        hooks: {
          beforeSave: (item: Image) => {
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
      foreignKey: 'relatedId',
      targetKey: 'id',
      as: 'vehicles',
    })
  }
}

export default Image
