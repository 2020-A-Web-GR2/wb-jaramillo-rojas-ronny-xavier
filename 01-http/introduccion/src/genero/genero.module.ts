import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GeneroController} from "./genero.controller";
import {GeneroEntity} from "./genero.entity";
import {GeneroService} from "./genero.service";
@Module({
    controllers:[
        GeneroController
    ],
    imports:[
        TypeOrmModule.forFeature(
            [
                GeneroEntity
            ],
            'default' //Nombre cadena de conexión
        )
    ],
    providers:[
        GeneroService
    ]
})
export class GeneroModule{

}