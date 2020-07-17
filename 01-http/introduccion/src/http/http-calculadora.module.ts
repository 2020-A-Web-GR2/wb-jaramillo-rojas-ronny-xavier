import {Module} from "@nestjs/common";
import {HtttpCalculadoraController} from "./htttp-calculadora.controller";
@Module({
    imports: [],
    controllers: [
        HtttpCalculadoraController
    ],
    providers: [],
})
export class HttpCalculadoraModule {}