import { DataTypes, Model, Sequelize } from 'sequelize'

class Branch extends Model {
  static initWithSequelize(sequelize: Sequelize) {
    return Branch.init(
      {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        complement: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        postalCode: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'branchs',
        tableName: 'branchs',
      },
    )
  }
}

export default Branch
