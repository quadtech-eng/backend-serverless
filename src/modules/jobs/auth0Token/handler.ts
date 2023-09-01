import { PutParameterCommand } from '@aws-sdk/client-ssm'
import { generateAuth0Token } from '@utils/generateAuth0Token'
import { ssmClient } from '@utils/ssm'

const paramName = 'tokenAuth0'
export const resetToken = async () => {
  try {
    const token = await generateAuth0Token()
    await ssmClient.send(
      new PutParameterCommand({
        Name: paramName,
        Value: token,
        Type: 'String',
        Overwrite: true,
      }),
    )
  } catch (error) {
    console.error('User activation email resent successfully error:', error)
  }
}
