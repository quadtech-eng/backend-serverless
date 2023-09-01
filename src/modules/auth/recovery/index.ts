import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.recovery`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/recovery',
      },
    },
  ],
}
