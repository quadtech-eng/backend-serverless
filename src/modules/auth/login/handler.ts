
import { loginService } from 'src/services/auth.service'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { ILoginData } from 'src/types/user.interface'


export const login: APIGatewayProxyHandler = async (event) => {
  try {
    const { email, userPassword, userType } = JSON.parse(event?.body) as ILoginData
   const response = await loginService({ email, userPassword, userType });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          accessToken: response?.token,
          userInfo: response.user,
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
