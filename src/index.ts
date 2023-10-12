import app from './app';
import { env, logger } from './utils';

app.listen(env.PORT, () => {
  logger.info(`Server running on port ::${env.PORT} in ${env.NODE_ENV} mode`);
});
