import { config } from 'dotenv'
import { Sequelize } from 'sequelize'

import { environment } from '@config/database'
import {
  AppConfig as appConfigModel,
  Branch as branchModel,
  Faq as faqModel,
  Image as imageModel,
  ProductBrand as productBrandModel,
  ProductModel as productModelModel,
  ProductType as productTypeModel,
  Simulation as simulationModel,
  Vehicle as vehicleModel,
  VehicleOffer as vehicleOfferModel,
} from '@models/index'

config()

const models = {
  AppConfig: appConfigModel,
  Branch: branchModel,
  Faq: faqModel,
  Image: imageModel,
  ProductBrand: productBrandModel,
  ProductModel: productModelModel,
  ProductType: productTypeModel,
  Simulation: simulationModel,
  Vehicle: vehicleModel,
  VehicleOffer: vehicleOfferModel,
} as const
export type dbType = typeof models

class Database {
  public connection: Sequelize
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(
      environment[process?.env?.ENVIRONMENT || 'local'],
    )
    Object.keys(models).forEach((key) => {
      const model = models[key as keyof dbType]
      model.initWithSequelize(this.connection)
    })
    Object.keys(models).forEach((key) => {
      const model = models[key as keyof dbType]
      if (model.associate) {
        model.associate(models)
      }
    })
  }
}

export default new Database()
