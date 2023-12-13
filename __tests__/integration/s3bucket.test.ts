import * as dotenv from 'dotenv'
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { s3Client } from '@utils/s3'

dotenv.config()

describe('Testing AWS Servicess offline with LocalStack', () => {
  const bucketConfig = {
    Bucket: 'test',
  }
  beforeAll(async () => {
    await s3Client.send(new CreateBucketCommand(bucketConfig))
  })

  afterAll(async () => {
    await s3Client.send(new DeleteBucketCommand(bucketConfig))
  })

  it('it should return an array with a S3 Bucket', async () => {
    const expected = bucketConfig.Bucket
    const buckets = await s3Client.send(new ListBucketsCommand({}))
    const bucketList = buckets.Buckets?.map((bucket) => bucket.Name || '') || []
    const name = bucketList.find((name) => name === expected)
    expect(name).toStrictEqual(expected)
  })
})
