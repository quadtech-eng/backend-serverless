

import { APIGatewayProxyHandler } from 'aws-lambda'
import { resetPasswordService } from 'src/services/auth.service'

interface ResetBody {
  email:string 
  code:string
  newPassword: string
}

export const reset: APIGatewayProxyHandler = async (event) => {
  try {
    const { email,code, newPassword } = JSON.parse(event?.body) as ResetBody
  

    await resetPasswordService(email,code, newPassword)

    return {
      statusCode:201,
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
