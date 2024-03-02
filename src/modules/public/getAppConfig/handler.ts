import { config } from 'dotenv'
import { APIGatewayProxyHandler } from 'aws-lambda'

import '@database/index'
import { AppConfig } from '@models/index'

config()

export const getAppConfig: APIGatewayProxyHandler = async () => {
  try {
    const appConfig: any = await AppConfig.findOne({
      attributes: ['id', 'minVersion', 'toggles'],
      raw: true,
    })
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ...appConfig,
          toggles: JSON.parse(appConfig?.toggles || '{}'),
        },
        null,
        2,
      ),
    }
  } catch (error) {
    console.error('Erro to get app config:', error?.errors || error)
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
