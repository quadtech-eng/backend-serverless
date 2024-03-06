import { config } from 'dotenv'
import { APIGatewayProxyHandler } from 'aws-lambda'

import database from '@database/index'
import { Simulation } from '@models/index'
import { SimulationSchema, SimulationSchemaType } from '@schemas/simulation'

config()

export const saveSimulation: APIGatewayProxyHandler = async (event) => {
  const dbTransaction = await database.connection.transaction()
  try {
    const simulationBody = JSON.parse(event?.body) as SimulationSchemaType
    await SimulationSchema.validate(simulationBody, {
      abortEarly: false,
    })

    await Simulation.create({
      vehicleOfferId: simulationBody.vehicleOfferId,
      paymentType: simulationBody.paymentType,
      upfrontPayment: simulationBody.upfrontPayment,
      period: simulationBody.period,
      formOfPayment: simulationBody.formOfPayment,
      email: simulationBody.email,
      enabled: true,
    })

    await dbTransaction.commit()
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Simulation saved.',
        },
        null,
        2,
      ),
    }
  } catch (error) {
    await dbTransaction.rollback()
    console.error('Erro to save simulation:', error?.errors || error)
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error:
            error?.errors || 'Internal server error, please try again later.',
        },
        null,
        2,
      ),
    }
  }
}
