import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { port } from './config';

import { typeDefs, resolvers } from './graphql';

const app = express();

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

apollo.applyMiddleware({ app });

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`
  )
);
