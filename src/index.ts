import express from 'express';

import { SERVER_PORT } from './config';

const app = express();

app.get('/helloworld', (req, res) => {
  res.send('Hello, World!');
});

app.listen(SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${SERVER_PORT}`);
});
