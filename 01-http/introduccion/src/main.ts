import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  /* Aquí configuración
    Antes del método listen() ya que este inicia el servidor.
   */
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
