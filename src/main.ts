import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express = require('express');

const server = express();

export async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
  );
  app.enableCors();
  await app.init();
  return server;
}

// Local development bootstrap
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8080;
  NestFactory.create(AppModule).then(async (app) => {
    app.enableCors();
    await app.listen(port);
    console.log(`Local NestJS application running on: http://localhost:${port}`);
  });
}

// Vercel serverless entrypoint handler
let cachedHandler: any;
export default async (req: any, res: any) => {
  if (!cachedHandler) {
    await bootstrap();
    cachedHandler = server;
  }
  return cachedHandler(req, res);
};
