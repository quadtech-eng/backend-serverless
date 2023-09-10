import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.changePassword`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/change-password',
        authorizer: {
          name: 'auth0',
        },
      },
    },
  ],
}
