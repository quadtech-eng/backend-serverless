import { SSMClient } from "@aws-sdk/client-ssm";

let ssmClient = new SSMClient();

const isLocal = process.env.IS_OFFLINE;

if (isLocal) {
  const host = process.env.LOCALSTACK_HOST || "localhost";
  ssmClient = new SSMClient({
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
    endpoint: `http://${host}:4566`,
  });
}

export { ssmClient };
