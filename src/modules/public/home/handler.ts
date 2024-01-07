import * as dotenv from 'dotenv'
import { APIGatewayProxyHandler } from 'aws-lambda'
import '../../../database'

import { VehicleManufacturer } from '@models/index'
import { getImageUrl } from '@utils/helper'

dotenv.config()

export const homepage: APIGatewayProxyHandler = async () => {
  try {
    const vehicleManufacturers: any = await VehicleManufacturer.findAll({
      where: {
        enabled: true,
      },
      attributes: ['id', 'manufacturer', 'image', 'homepageOrder'],
      order: [['homepageOrder', 'ASC']],
      raw: true,
    })

    const newVehicleManufacturers = await Promise.all(
      vehicleManufacturers.map(async (item) => {
        const newImage = await getImageUrl(
          item.image,
          `${process.env.ENVIRONMENT}-${process.env.BUCKET_MANUFACTURER_NAME}`,
        )
        return { ...item, image: newImage }
      }),
    )

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          brands: newVehicleManufacturers,
          popular: [],
          mostWanted: [],
          premium: [],
          family: [],
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('Erro to get home info:', error?.errors || error)
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
