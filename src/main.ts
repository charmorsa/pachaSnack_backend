import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import clc from 'cli-color';
import { consumeMessagesEmail } from './config/received.message';
import { env } from './config/env';
// import { JsonExceptionFilter } from './middleware/validateBody.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new JsonExceptionFilter())
  app.enableCors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(','),
  });
  await app.listen(env.port, '0.0.0.0');

  console.log(clc.blueBright('##############################################'));
  console.log(clc.yellowBright(`Servidor iniciado en el puerto: ${env.port}`));
  console.log(clc.blueBright('##############################################'));
  await consumeMessagesEmail('email');
}

bootstrap().catch((error: unknown) => {
  console.error(clc.red('Error al iniciar el servidor', error));
  process.exit(1);
});
