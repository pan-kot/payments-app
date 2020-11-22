import express from 'express';

import { port } from './config';

import apollo from './apollo';

const app = express();

app.get('/healthcheck', (_, res) => {
  res.status(200).send('OK');
});

apollo.applyMiddleware({ app });

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(
    `🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`
  )
);
