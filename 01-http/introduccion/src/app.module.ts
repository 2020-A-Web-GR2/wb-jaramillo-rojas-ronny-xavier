import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
  imports: [
      //Aquí se incluyen otros módulos
      HttpJuegoModule
  ],
  controllers: [AppController],//Aquí se incluyen los controladores
  providers: [AppService], //Aquí se incluyen los servicios APP MODULE
})
export class AppModule {}
