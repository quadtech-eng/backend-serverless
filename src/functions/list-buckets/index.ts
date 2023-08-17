import { handlerPath } from "@utils/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.listBuckets`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/list-buckets",
        authorizer: {
          name: "auth0",
        },
      },
    },
  ],
};
