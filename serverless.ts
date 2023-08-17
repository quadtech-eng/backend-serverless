import type { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";

dotenv.config();

import { listBuckets } from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "relp-core-plataform",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      LOCALSTACK_HOST: process.env.LOCALSTACK_HOST || "localhost",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "s3:*",
              "lambda:*",
              "cloudwatch:*",
              "logs:*",
              "dynamodb:*",
            ],
            Resource: "*",
          },
        ],
      },
    },
    httpApi: {
      authorizers: {
        auth0: {
          identitySource: "$request.header.Authorization",
          issuerUrl: process.env.AUTH0_DOMAIN,
          audience: [process.env.AUTH0_AUDIENCE],
        },
      },
    },
  },
  // import the function via paths
  functions: {
    listBuckets,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
