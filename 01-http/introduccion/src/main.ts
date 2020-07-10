import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar cosas en JS
async function bootstrap() {
  /* Aquí configuración
    Antes del método listen() ya que este inicia el servidor.
   */
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  await app.listen(3001);
}
bootstrap();
