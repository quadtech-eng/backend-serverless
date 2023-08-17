import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@utils/s3";
import { APIGatewayProxyHandler } from "aws-lambda";

export const listBuckets: APIGatewayProxyHandler = async (): Promise<any> => {
  try {
    const buckets = await s3Client.send(new ListBucketsCommand({}));
    const allBuckets =
      buckets.Buckets?.map((bucket) => bucket.Name || "") || [];
    return {
      statusCode: 200,
      body: JSON.stringify(allBuckets, null, 2),
    };
  } catch (error) {
    console.error("Error while listing buckets:", error);

    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: "Internal server error, please try again later.",
        },
        null,
        2
      ),
    };
  }
};
