import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 5004;
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };

  app.enableCors(corsOptions)

  const config = new DocumentBuilder()
    .setTitle('GameStore')
    .setDescription('Rest documentation')
    .setVersion('1.0.0')
    .addTag("VT")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/swagger', app, document)

  // app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`Server started with port ${PORT}`));
}
bootstrap();
