import { DataTypes, Model, Sequelize } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

class AppConfig extends Model {
  public id: string
  public minVersion: string
  public toggles: string

  static initWithSequelize(sequelize: Sequelize) {
    super.init(
      {
        minVersion: DataTypes.STRING,
        toggles: DataTypes.TEXT,
      },
      {
        sequelize,
        modelName: 'appConfigs',
        tableName: 'appConfigs',
        hooks: {
          beforeSave: (item: AppConfig) => {
            if (!item.id) {
              item.id = uuidv4()
            }
          },
        },
      },
    )

    return this
  }

  static associate() {}
}

export default AppConfig
