import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.reset`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/reset',
      },
    },
  ],
}
