import { APIGatewayProxyHandler } from 'aws-lambda'

export const home: APIGatewayProxyHandler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          brands: [],
          popular: [],
          mostWanted: [],
          premium: [],
          family: [],
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('Erro to get home info:', error?.errors || error)
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error:
            error?.errors || 'Internal server error, please try again later.',
        },
        null,
        2,
      ),
    }
  }
}
