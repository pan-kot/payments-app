import { useEnv, getNotNull, getOneOf } from './env';

const environment = getOneOf('NODE_ENV', ['production', 'development', 'test']);

const isProduction = environment === 'production';

useEnv(isProduction);

export const port = getNotNull('SERVER_PORT');
