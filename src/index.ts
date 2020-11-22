import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { port, isProduction } from './config';

import { typeDefs, resolvers } from './schema';

const app = express();

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !isProduction,
});

apollo.applyMiddleware({ app });

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(
    `🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`
  )
);
