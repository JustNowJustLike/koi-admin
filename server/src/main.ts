import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('koi-admin')
    .setContact('最爱白菜吖', 'https://space.bilibili.com/388985971', '1355081829@qq.com')
    .setDescription('nestjs+typeorm+jwt+vben开发的中台系统')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });
  SwaggerModule.setup('swagger', app, document);

  const port = 3000;
  await app.listen(port, () => {
    console.log(`http://localhost:${port}/swagger`);
  });
}

bootstrap();
