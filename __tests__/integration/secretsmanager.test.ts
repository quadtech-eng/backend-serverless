import * as dotenv from 'dotenv'
import {
  CreateSecretCommand,
  DeleteSecretCommand,
  GetSecretValueCommand,
  ListSecretsCommand,
} from '@aws-sdk/client-secrets-manager'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

import { smClient } from '@utils/secretsmanager'

dotenv.config()
describe('Test secretsmanager', () => {
  const secret = {
    Name: `secretName-${Date.now()}`,
    SecretString: 'secretString',
  }

  beforeAll(async () => {
    await smClient.send(new CreateSecretCommand(secret))
  })

  afterAll(async () => {
    await smClient.send(
      new DeleteSecretCommand({
        SecretId: secret.Name,
      }),
    )
  })

  it('should return a valid secret value', async () => {
    const secrets = await smClient.send(new ListSecretsCommand({}))
    const secretList =
      secrets.SecretList?.map((secret) => secret.Name || '') || []
    const name = secretList.find((name) => name === secret.Name)
    expect(name).toStrictEqual(secret.Name)
    const response = await smClient.send(
      new GetSecretValueCommand({
        SecretId: secret.Name,
      }),
    )
    expect(response.SecretString).toEqual(secret.SecretString)
  })
})
