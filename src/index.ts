// create a basic express server to ping the server

import App from './app';
import logger from './services/logger';
import XPController from './controllers/XP/xp.controller';

const main = async () => {
  // EnvService should always be the first

  // Setup db connection and then start app
  const app = new App([new XPController()]);

  app.listen();
};
main()
  .then(() => {
    logger.info('App started');
  })
  .catch((err) => {
    logger.error('App failed');
    logger.error(err.stack);
  });
