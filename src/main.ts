import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidateInputPipe } from './core/pipe/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //prefix
  app.setGlobalPrefix(process.env.API_PREFIX);

  //enable swagger
  const config = new DocumentBuilder()
    .setTitle('Weather API Documentation')
    .setDescription(
      'Data gathered from https://openweathermap.org/api. Results saved to PostgreSQL.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.API_PREFIX, app, document);

  //auto-validate all our endpoints
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(3000);
}
bootstrap();
