import { DataTypes, Model, Sequelize } from 'sequelize'

class VehicleManufacturers extends Model {
  static initWithSequelize(sequelize: Sequelize) {
    return VehicleManufacturers.init(
      {
        wmi: DataTypes.STRING,
        manufacturer: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        showOnHome: DataTypes.BOOLEAN,
        enabled: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'vehicleManufacturers',
        tableName: 'vehicleManufacturers',
      },
    )
  }
}

export default VehicleManufacturers
