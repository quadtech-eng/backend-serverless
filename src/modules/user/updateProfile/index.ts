import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.updateProfile`,
  events: [
    {
      httpApi: {
        method: 'patch',
        path: '/update-profile',
        authorizer: {
          name: 'auth0',
        },
      },
    },
  ],
}
