import { config } from 'dotenv'
import {
  DeleteParameterCommand,
  GetParameterCommand,
  PutParameterCommand,
} from '@aws-sdk/client-ssm'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

import { ssmClient } from '@utils/ssm'

config()

describe('Test ssm', () => {
  const param = {
    name: `parameterName-${Date.now()}`,
    parameter: 'parameterString',
  }
  beforeAll(async () => {
    await ssmClient.send(
      new PutParameterCommand({
        Name: param.name,
        Value: param.parameter,
        Type: 'String',
      }),
    )
  })

  afterAll(async () => {
    await ssmClient.send(
      new DeleteParameterCommand({
        Name: param.name,
      }),
    )
  })

  it('should return a valid secret value', async () => {
    const response = await ssmClient.send(
      new GetParameterCommand({
        Name: param.name,
      }),
    )
    expect(response.Parameter?.Value).toEqual(param.parameter)
  })
})
