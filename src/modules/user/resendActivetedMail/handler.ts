import { GetParameterCommand } from '@aws-sdk/client-ssm'
import api from '@service/api'
import { ssmClient } from '@utils/ssm'

import { APIGatewayProxyHandler } from 'aws-lambda'
import { SSM } from 'src/constants'
import { ResendActivetedSchema } from 'src/schemas/user'

interface ResendActivetedMailBody {
  email: string
}

export const resendActivetedMail: APIGatewayProxyHandler = async (event) => {
  try {
    const { email } = JSON.parse(event.body) as ResendActivetedMailBody
    await ResendActivetedSchema.validate({ email }, { abortEarly: false })
    const ssmToken = await ssmClient.send(
      new GetParameterCommand({
        Name: SSM.TOKEN,
      }),
    )

    const response = await api.get(`/api/v2/users-by-email?email=${email}`, {
      headers: {
        Authorization: `Bearer ${ssmToken.Parameter?.Value}`,
      },
    })

    await api.post(
      `/api/v2/jobs/verification-email`,
      {
        user_id: response.data[0].user_id,
        client_id: process.env.AUTH0_CLIENT_ID,
        identity: {
          user_id: response.data[0].identities[0].user_id,
          provider: response.data[0].identities[0].provider,
        },
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
          message: 'User activation email resent successfully.',
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('User activation email resent successfully error:', error)

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
