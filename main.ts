
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./gql/schema.ts";
import montoose from "mongoose";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { Query } from "./resolvers.ts/query.ts";
import { Mutation } from "./resolvers.ts/mutation.ts";
import { startStandaloneServer } from '@apollo/server/standalone';
const env=await load();

const MONGO_URL = Deno.env.get("MONGO_URL")||env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}

// Connect to MongoDB
await montoose.connect(MONGO_URL);

console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

const { url } = await startStandaloneServer(server);
console.info(`🚀 Server ready at ${url}`);

