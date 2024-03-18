import { config } from 'dotenv'
import { APIGatewayProxyHandler } from 'aws-lambda'

import '@database/index'
import { Branch } from '@models/index'

config()

export const getBranch: APIGatewayProxyHandler = async () => {
  try {
    const branches: any = await Branch.findAll({
      where: {
        enabled: true,
      },
      attributes: ['id', 'city', 'country', 'comingSoon'],
      raw: true,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          branches,
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('Erro to get branches list:', error?.errors || error)
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
