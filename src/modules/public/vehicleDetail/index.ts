import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.detail`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/vehicle-detail/{id}',
      },
    },
  ],
}
