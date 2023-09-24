import path from 'path';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor, VersioningType } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // * config
  const configService = app.get(ConfigService);

  // * settings
  app.enableCors();
  app.setGlobalPrefix("/api");
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());

  // * static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'), { index: false, prefix: '/public' });

  // * swagger
  const documentConfig = new DocumentBuilder()
    .setTitle("WebSocket-Chat Project")
    .setDescription("Example Project")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup("/document", app, document, { jsonDocumentUrl: '/document.json' });

  await app.listen(configService.get<number>('MAIN_PORT'));
}
bootstrap();