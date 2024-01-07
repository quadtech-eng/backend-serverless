import { DataTypes, Model, Sequelize } from 'sequelize'

class VehicleManufacturer extends Model {
  static initWithSequelize(sequelize: Sequelize) {
    return VehicleManufacturer.init(
      {
        wmi: DataTypes.STRING,
        manufacturer: DataTypes.STRING,
        image: DataTypes.STRING,
        homepageOrder: DataTypes.INTEGER,
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

export default VehicleManufacturer
