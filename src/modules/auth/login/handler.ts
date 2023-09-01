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

    const response = await api.post(
      '/oauth/token',
      {
        grant_type: AUTH0.GRANT_TYPE,
        username: email,
        password,
        audience: process.env.AUTH0_AUDIENCE,
        scope: AUTH0.AUTH0_SCOPE,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // TODO confirmar melhor forma de pegar o ip do client
          // auth0-forwarded-for serve como protecao contra ataques força bruta
          'auth0-forwarded-for': event.headers['client-ip'],
        },
      },
    )

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
