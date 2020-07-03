import {Module} from "@nestjs/common";
import {HttpJuegoController} from "./http-juego.controller";
//@Nombre() -> Decorador
@Module({
    imports: [],
    controllers: [
        HttpJuegoController
    ],
    providers: [],
})
export class HttpJuegoModule {}