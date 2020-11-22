import { ApolloServer } from 'apollo-server-express';

import { isProduction } from './config';

import { typeDefs, resolvers } from './schema';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !isProduction,
});

export default apollo;
