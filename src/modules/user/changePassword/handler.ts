import { GetParameterCommand } from '@aws-sdk/client-ssm'
import api from '@service/api'
import { parseToken } from '@utils/parseToken'
import { ssmClient } from '@utils/ssm'

import { SSM } from '@constants/index'
import { ChangePasswordSchema } from '@schemas/user'
import { APIGatewayProxyHandler } from 'aws-lambda'

interface ChangePasswordBody {
  password: string
  confirmPassword: string
}

export const changePassword: APIGatewayProxyHandler = async (event) => {
  try {
    const { password, confirmPassword } = JSON.parse(
      event?.body,
    ) as ChangePasswordBody
    const { sub: userId } = parseToken(event?.headers?.authorization)
    await ChangePasswordSchema.validate(
      { password, confirmPassword },
      { abortEarly: false },
    )
    const ssmToken = await ssmClient.send(
      new GetParameterCommand({
        Name: SSM.TOKEN,
      }),
    )

    const response = await api.patch(
      `/api/v2/users/${userId}`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${ssmToken.Parameter?.Value}`,
        },
      },
    )

    return {
      statusCode: response?.data?.status || 201,
      body: JSON.stringify(
        {
          message: 'User updated password.',
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error(
      'User update password error:',

      (error?.response?.data?.description?.rules &&
        'Password does not meet strength requirements') ||
        error?.errors ||
        error?.response?.data?.message ||
        error?.response?.data?.description ||
        error?.response?.data?.error ||
        error,
    )
    return {
      statusCode: error?.response?.data?.statusCode || 500,
      body: JSON.stringify(
        {
          error:
            error?.errors ||
            error?.response?.data?.message ||
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
