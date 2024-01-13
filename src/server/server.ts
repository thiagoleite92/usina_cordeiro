import { app } from '../app/app';
import { env } from '../env';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! ' + env.PORT);
  });
