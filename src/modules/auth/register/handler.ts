import api from '@service/api'

import { AUTH0 } from '@constants/index'
import { RegisterSchema } from '@schemas/auth'
import { APIGatewayProxyHandler } from 'aws-lambda'

interface RegisterBody {
  name: string
  email: string
  password: string
}

export const register: APIGatewayProxyHandler = async (event) => {
  try {
    const { name, email, password } = JSON.parse(event?.body) as RegisterBody
    await RegisterSchema.validate(
      { name, email, password },
      { abortEarly: false },
    )

    const response = await api.post('/dbconnections/signup', {
      name,
      email,
      password,
      connection: AUTH0.CONNECTION,
      client_id: process.env.AUTH0_CLIENT_ID,
    })

    return {
      statusCode: response?.data?.status || 201,
      body: JSON.stringify(
        {
          message: 'User successfully registered.',
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error(
      'error registering new user:',
      (error?.response?.data?.description?.rules &&
        'Password does not meet strength requirements') ||
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
            (error?.response?.data?.description?.rules &&
              'Password does not meet strength requirements') ||
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
