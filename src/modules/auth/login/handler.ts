import api from '@service/api'

import { APIGatewayProxyHandler } from 'aws-lambda'
import { AUTH0 } from 'src/constants'
import { LoginSchema } from 'src/schemas/auth'

interface LoginUserBody {
  email: string
  password: string
}

export const login: APIGatewayProxyHandler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body) as LoginUserBody
    await LoginSchema.validate({ email, password }, { abortEarly: false })

    const response = await api.post('/oauth/token', {
      grant_type: AUTH0.GRANT_TYPE,
      username: email,
      password,
      realm: AUTH0.CONNECTION,
      audience: process.env.AUTH0_AUDIENCE,
      scope: AUTH0.AUTH0_SCOPE,
      client_id: process.env.AUTH0_CLIENT_ID,
    })
    console.log(response.data.access_token)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          access_token: response?.data?.access_token,
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('error registering new user:', error)

    return {
      statusCode: error?.response?.data?.statusCode || 500,
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
