import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createTestChannels, createTestDatas, createTestUsers } from '@utils/index';
import typeDefs from '@graph/typedefs';
import resolvers from '@graph/resolvers';

dotenv.config();

const configMongoURL = process.env.FILESS_IO_URI || "";
const configPort = Number(process.env.PORT) || 3000;

interface MyContext {

  token?: string;

}

// QwUeNyetRvzNs5gH

async function connectToMongo() {
  console.log("connecting to mongodb with mongoose")
  await mongoose.connect(configMongoURL);
  console.log("connected to mongodb with mongoose")
}

connectToMongo().catch(err => console.error(err));

createTestDatas();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);


// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const wsServerCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer<MyContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose();
          },
        };
      },
    }
  ],
});

await apolloServer.start();

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer));

httpServer.listen(configPort, () => {

  console.log(`Server is now running on http://localhost:${configPort}/graphql`);

});
