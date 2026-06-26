import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS just in case
  app.enableCors();
  
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Zentra AI application running on: http://localhost:${port}`);
}
bootstrap();
