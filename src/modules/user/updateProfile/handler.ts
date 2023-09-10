import { GetParameterCommand } from '@aws-sdk/client-ssm'
import api from '@service/api'
import { parseToken } from '@utils/parseToken'
import { ssmClient } from '@utils/ssm'

import { SSM } from '@constants/index'
import { UpdateProfileSchema } from '@schemas/user'
import { APIGatewayProxyHandler } from 'aws-lambda'

interface UpdateProfileBody {
  name: string
}

export const updateProfile: APIGatewayProxyHandler = async (event) => {
  try {
    const { name } = JSON.parse(event?.body) as UpdateProfileBody
    const { sub: userId } = parseToken(event?.headers?.authorization)
    await UpdateProfileSchema.validate({ name }, { abortEarly: false })
    const ssmToken = await ssmClient.send(
      new GetParameterCommand({
        Name: SSM.TOKEN,
      }),
    )

    const response = await api.patch(
      `/api/v2/users/${userId}`,
      {
        name,
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
          message: 'User updated successfully.',
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error(
      'User updated error:',
      error?.errors ||
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
