import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpCalculadoraModule} from "./http/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaEntity} from "./mascota/mascota.entity";

@Module({
  imports: [
      //Aquí se incluyen otros módulos
      HttpJuegoModule,
      HttpCalculadoraModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule.forRoot({
          name: 'default', //Nombre conexión
          type: 'mysql', //mysql postgres, etc
          host: 'localhost', //ip
          port: 3306, //puerto
          username: 'root', //user
          password: '', //passwd
          database: 'prueba', //Base de Datos
          entities: [  // todas las entidades
            UsuarioEntity,
              VacunaEntity,
              MascotaEntity
          ],
          synchronize: true, //Actualiza el esquema de la base de datos
          dropSchema: false, // Eliminar Datos y Esquema de base de datos
      })
  ],
  controllers: [AppController],//Aquí se incluyen los controladores
  providers: [AppService], //Aquí se incluyen los servicios APP MODULE
})
export class AppModule {}
