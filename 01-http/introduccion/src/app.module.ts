import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpCalculadoraModule} from "./http/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      //Aquí se incluyen otros módulos
      HttpJuegoModule,
      HttpCalculadoraModule,
      UsuarioModule
  ],
  controllers: [AppController],//Aquí se incluyen los controladores
  providers: [AppService], //Aquí se incluyen los servicios APP MODULE
})
export class AppModule {}
