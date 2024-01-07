import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from './s3'

const getImageUrl = async (image, bucket) => {
  if (image === null) return null
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: `${image}`,
  })

  const presignedUrl = await getSignedUrl(s3Client, getObjectCommand, {
    expiresIn: 1 * 60 * 60 * 24,
  })

  return presignedUrl
}

export { getImageUrl }
