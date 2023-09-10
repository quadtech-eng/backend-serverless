import type { AWS } from '@serverless/typescript'
import * as dotenv from 'dotenv'

import * as authModule from '@modules/auth/index'
import * as jobsModule from '@modules/jobs/index'
import * as userModule from '@modules/user/index'

dotenv.config()

const serverlessConfiguration: AWS = {
  service: 'relp-core-plataform',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      LOCALSTACK_HOST: process.env.LOCALSTACK_HOST || 'localhost',
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      ENVIRONMENT: process.env.ENVIRONMENT,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              's3:*',
              'lambda:*',
              'cloudwatch:*',
              'logs:*',
              'dynamodb:*',
              'ssm:*',
            ],
            Resource: '*',
          },
        ],
      },
    },
    httpApi: {
      authorizers: {
        auth0: {
          identitySource: '$request.header.Authorization',
          issuerUrl: process.env.AUTH0_DOMAIN,
          audience: [process.env.AUTH0_AUDIENCE],
        },
      },
    },
  },
  functions: {
    ...authModule,
    ...jobsModule,
    ...userModule,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
}

module.exports = serverlessConfiguration
