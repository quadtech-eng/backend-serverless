import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.userInfo`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/user-info',
        authorizer: {
          name: 'auth0',
        },
      },
    },
  ],
}
