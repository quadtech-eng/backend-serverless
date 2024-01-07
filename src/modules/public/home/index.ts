import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.homepage`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/home',
      },
    },
  ],
}
