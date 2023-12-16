import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.home`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/home',
      },
    },
  ],
}
