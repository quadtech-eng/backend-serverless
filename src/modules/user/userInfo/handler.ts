import api from '@service/api'

import { APIGatewayProxyHandler } from 'aws-lambda'

export const userInfo: APIGatewayProxyHandler = async (event) => {
  try {
    const token = event.headers.authorization.split(' ')[1]
    const userinfo = await api.get('/userinfo', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          userInfo: userinfo?.data,
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('error geting user info:', error)

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
