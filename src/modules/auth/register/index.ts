import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.register`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/register',
      },
    },
  ],
}
