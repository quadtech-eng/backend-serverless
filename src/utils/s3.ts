import { S3Client } from '@aws-sdk/client-s3'

let s3Client = new S3Client({})
const isLocal = process.env.IS_OFFLINE

if (isLocal) {
  const host = process.env.LOCALSTACK_HOST || 'localhost'
  s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
    endpoint: `http://${host}:4566`,
    forcePathStyle: true,
  })
}

export { s3Client }
