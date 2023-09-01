import { PutParameterCommand } from '@aws-sdk/client-ssm'
import { generateAuth0Token } from '@utils/generateAuth0Token'
import { ssmClient } from '@utils/ssm'
import { SSM } from 'src/constants'

export const resetToken = async () => {
  try {
    const token = await generateAuth0Token()
    await ssmClient.send(
      new PutParameterCommand({
        Name: SSM.TOKEN,
        Value: token,
        Type: 'String',
        Overwrite: true,
      }),
    )
  } catch (error) {
    console.error('User activation email resent successfully error:', error)
  }
}
