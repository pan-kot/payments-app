# payments-app

This is a playground Node.js application.

## How to start

Note: production mode requires application settings specified in the `.env` file. See `.env.sample` for reference.

```
# Install the dependencies

yarn install

# Setup database

yarn db:migrate
yarn db:seed:demo

# Run in the development mode

yarn dev

# Run in the production mode

yarn build
yarn start

# Run all tests

yarn test
```
