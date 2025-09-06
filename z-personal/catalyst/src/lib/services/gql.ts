import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient(
  typeof window === "undefined"
    ? "http://localhost:3001/api/graphql"
    : `${
        process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
      }/api/graphql`
);

export default gqlClient;
