import 'source-map-support/register';

import express from 'express';
import debug from 'debug';

import { PORT, BIND_HOST } from './environment';

import router from './router';

import logger from './logger';

const app = express();

app.use(router);

logger.info(`Binding to ${BIND_HOST}:${PORT}`);
app.listen(PORT, BIND_HOST, (e) => {
  if (e) {
    console.trace(e);
    return process.exit(1);
  }
  logger.info(`Bound to ${BIND_HOST}:${PORT}`)
});
