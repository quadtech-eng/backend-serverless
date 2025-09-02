import { config } from 'dotenv'
import type { AWS } from '@serverless/typescript'


import * as authModule from '@modules/auth/index'
// import * as jobsModule from '@modules/jobs/index'
// import * as publicModule from '@modules/public/index'
// import * as userModule from '@modules/user/index'

config()

const serverlessConfiguration: AWS = {
  service: 'relp-core-plataform',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-plugin-log-retention',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'us-east-1',
    memorySize: 256,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_KEY: process.env.SUPABASE_KEY!,
      JWT_SECRET: process.env.JWT_SECRET!,
      EMAIL_USER: process.env.EMAIL_USER!,
      EMAIL_PASS: process.env.EMAIL_PASS!,
    },

  },
  functions: {
    ...authModule,
    // ...jobsModule,
    // ...publicModule,
    // ...userModule,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    logRetentionInDays: 30,
  },
}

module.exports = serverlessConfiguration
