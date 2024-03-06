import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.saveSimulation`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/simulation',
      },
    },
  ],
}
