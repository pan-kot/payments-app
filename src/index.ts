import dotenv from 'dotenv';
import express from 'express';

const isProduction = process.env.NODE_ENV === 'production';

dotenv.config();

// Falls back to sample configuration if .env if not defined
if (!isProduction) {
  dotenv.config({ path: '.env.sample' });
}

const app = express();

const PORT = process.env.SERVER_PORT;

app.get('/helloworld', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${PORT}`);
});
