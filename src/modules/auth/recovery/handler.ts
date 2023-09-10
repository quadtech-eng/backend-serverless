import api from '@service/api'

import { AUTH0 } from '@constants/index'
import { RecoverySchema } from '@schemas/auth'
import { APIGatewayProxyHandler } from 'aws-lambda'

interface RecoveryBody {
  email: string
}

export const recovery: APIGatewayProxyHandler = async (event) => {
  try {
    const { email } = JSON.parse(event?.body) as RecoveryBody
    await RecoverySchema.validate({ email }, { abortEarly: false })

    const response = await api.post('/dbconnections/change_password', {
      email,
      connection: AUTH0.CONNECTION,
      client_id: process.env.AUTH0_CLIENT_ID,
    })

    return {
      statusCode: response?.data?.status || 201,
      body: JSON.stringify(
        {
          message: 'Recovery request made successfully.',
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error(
      'error registering new user:',
      error?.errors ||
        error?.response?.data?.description ||
        error?.response?.data?.error ||
        error,
    )

    return {
      statusCode: error?.response?.status || 500,
      body: JSON.stringify(
        {
          error:
            error?.errors ||
            error?.response?.data?.description ||
            error?.response?.data?.error ||
            'Internal server error, please try again later.',
        },
        null,
        2,
      ),
    }
  }
}
