import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5004;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('GameStore')
    .setDescription('Rest documentation')
    .setVersion('1.0.0')
    .addTag("VT")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/swagger', app, document)

  await app.listen(PORT, () => console.log(`Server started with port ${PORT}`));
}
bootstrap();
