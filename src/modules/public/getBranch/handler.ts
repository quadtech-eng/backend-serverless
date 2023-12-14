import * as dotenv from 'dotenv'
import { APIGatewayProxyHandler } from 'aws-lambda'
import '../../../database'

import { Branch } from '@models/index'

dotenv.config()
export const getBranch: APIGatewayProxyHandler = async () => {
  try {
    const branchs: any = await Branch.findAll({
      where: {
        enabled: true,
      },
      attributes: ['id', 'city', 'country'],
      raw: true,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          branchs,
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('Erro to get branchs list:', error?.errors || error)
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
