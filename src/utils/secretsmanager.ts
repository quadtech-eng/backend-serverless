import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager'

let smClient = new SecretsManagerClient()
const isLocal = process.env.IS_OFFLINE

if (isLocal) {
  const host = process.env.LOCALSTACK_HOST || 'localhost'
  smClient = new SecretsManagerClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
    endpoint: `http://${host}:4566`,
  })
}

export { smClient }
