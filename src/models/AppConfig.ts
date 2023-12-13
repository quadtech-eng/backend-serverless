import { DataTypes, Model, Sequelize } from 'sequelize'

class AppConfig extends Model {
  static initWithSequelize(sequelize: Sequelize) {
    return AppConfig.init(
      {
        minVersion: DataTypes.STRING,
        toggles: DataTypes.TEXT,
      },
      {
        sequelize,
        modelName: 'appConfigs',
        tableName: 'appConfigs',
      },
    )
  }
}

export default AppConfig
