import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_URL}/api/graphql`)

export default gqlClient;