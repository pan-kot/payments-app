import express from 'express';

import { port } from './config';

const app = express();

app.get('/helloworld', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
