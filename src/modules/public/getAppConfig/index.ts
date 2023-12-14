import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.getAppConfig`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/app-config',
      },
    },
  ],
}
