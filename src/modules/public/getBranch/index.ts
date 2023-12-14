import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.getBranch`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/branch',
      },
    },
  ],
}
