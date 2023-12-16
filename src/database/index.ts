import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { environment } from 'src/config/database'
import { AppConfig, Branch, VehicleManufacturers } from 'src/models'

dotenv.config()

const models: any = [AppConfig, Branch, VehicleManufacturers]
class Database {
  public connection: Sequelize
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(environment[process.env.ENVIRONMENT])
    models.forEach((model) => model.initWithSequelize(this.connection))
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models)
      }
    })
  }
}

export default new Database()
