import { handlerPath } from '@utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.resetToken`,
  events: [
    {
      schedule: 'rate(10 minutes)',
    },
  ],
}
