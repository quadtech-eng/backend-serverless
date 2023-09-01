import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.resendActivetedMail`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/resend-activeted-mail',
        authorizer: {
          name: 'auth0',
        },
      },
    },
  ],
}
