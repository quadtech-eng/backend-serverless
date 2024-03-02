import { config } from 'dotenv'
import { APIGatewayProxyHandler } from 'aws-lambda'

import '@database/index'
import { getImageUrl } from '@utils/helper'
import { Image, ProductBrand, Vehicle, VehicleOffer } from '@models/index'

config()

const formatVehicleOffer = async (vehicleOffer) => {
  const newVehicleOffer = await Promise.all(
    vehicleOffer.map(async (item) => {
      const imagesWithUrls = await Promise.all(
        item.dataValues.vehicles.dataValues.images.map(async (image) => {
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
        ...item.dataValues,
        vehicles: {
          ...item.dataValues.vehicles.dataValues,
          images: imagesWithUrls,
        },
      }
    }),
  )
  return newVehicleOffer
}

export const homepage: APIGatewayProxyHandler = async () => {
  try {
    const productBrands = await ProductBrand.findAll({
      where: {
        enabled: true,
        showOnHome: true,
      },
      attributes: ['id', 'name', 'image', 'order'],
      order: [['order', 'ASC']],
      raw: true,
    })

    const newProductBrands = await Promise.all(
      productBrands.map(async (item) => {
        const newImage = await getImageUrl(
          item.image,
          `${process.env.ENVIRONMENT}-${process.env.BUCKET_IMAGE}`,
        )
        return { ...item, image: newImage }
      }),
    )

    const popular = await VehicleOffer.findAll({
      where: {
        enabled: true,
        showOnHome: true,
        homepageGroup: 'Popular',
      },
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
      order: [['order', 'ASC']],
    })

    const mostWanted = await VehicleOffer.findAll({
      where: {
        enabled: true,
        showOnHome: true,
        homepageGroup: 'MostWanted',
      },
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
      order: [['order', 'ASC']],
    })

    const premium = await VehicleOffer.findAll({
      where: {
        enabled: true,
        showOnHome: true,
        homepageGroup: 'Premium',
      },
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
      order: [['order', 'ASC']],
    })

    const family = await VehicleOffer.findAll({
      where: {
        enabled: true,
        showOnHome: true,
        homepageGroup: 'Family',
      },
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
      order: [['order', 'ASC']],
    })

    const newPopular = await formatVehicleOffer(popular)
    const newMostWanted = await formatVehicleOffer(mostWanted)
    const newPremium = await formatVehicleOffer(premium)
    const newFamily = await formatVehicleOffer(family)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          brands: newProductBrands,
          popular: newPopular,
          mostWanted: newMostWanted,
          premium: newPremium,
          family: newFamily,
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
