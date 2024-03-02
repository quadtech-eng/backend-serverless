import { config } from 'dotenv'
import { APIGatewayProxyHandler } from 'aws-lambda'

import '@database/index'
import { getImageUrl } from '@utils/helper'
import { Image, Vehicle, VehicleOffer } from '@models/index'

config()

const formatVehicleDetail = async (vehicleDetail) => {
  const images = await Promise.all(
    vehicleDetail.dataValues.vehicles.dataValues.images.map(async (image) => {
      const imageUrl = await getImageUrl(
        image.dataValues.image,
        `${process.env.ENVIRONMENT}-${process.env.BUCKET_IMAGE}`,
      )
      return {
        ...image.dataValues,
        imageUrl,
      }
    }),
  )
  return {
    ...vehicleDetail.dataValues,
    vehicles: {
      ...vehicleDetail.dataValues.vehicles.dataValues,
      images,
    },
  }
}

export const detail: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event?.pathParameters

    const vehicleDetail = await VehicleOffer.findByPk(id, {
      include: [
        {
          model: Vehicle,
          as: 'vehicles',
          include: [
            {
              model: Image,
              as: 'images',
            },
          ],
        },
      ],
    })

    if (!vehicleDetail) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            error: 'Vehicle detail not found.',
          },
          null,
          2,
        ),
      }
    }

    const newVehicleDetail = await formatVehicleDetail(vehicleDetail)

    const filterVehicleDetail = await VehicleOffer.findAll({
      where: {
        enabled: true,
      },
      include: [
        {
          model: Vehicle,
          as: 'vehicles',
          where: {
            productModelId: newVehicleDetail.vehicles.productModelId,
          },
        },
      ],
      raw: true,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          vehicleDetail: newVehicleDetail,
          filterVehicleDetail,
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('Erro to get vehicle detail:', error?.errors || error)
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
