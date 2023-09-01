import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.login`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/login',
      },
    },
  ],
}
