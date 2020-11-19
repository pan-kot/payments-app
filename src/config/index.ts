import { useEnv, getNotNull, getOneOf } from './env';

const NODE_ENV = getOneOf('NODE_ENV', ['production', 'development', 'test']);

const isProduction = NODE_ENV === 'production';

useEnv(isProduction);

// Settings

export const SERVER_PORT = getNotNull('SERVER_PORT');
