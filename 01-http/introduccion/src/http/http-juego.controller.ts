import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

@Controller('juegos-http') //Esto es un segmento de la URL
                                // http://localhost:3001/juegos-http
export class HttpJuegoController{
    @Get('hola')
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException('No envía nada.')
        //return "Hola GET! :D";
    }
    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return "Hola POST! :D";
    }
    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control','none')
    @Header('EPN','Cabecera')
    holaDelete(){
        return "Hola DELETE! :D";
    }
    //Parámetros de ruta
    // /Ruta/:parametro/de/ruta:parametro2
    // http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros',parametrosRuta);
        if (isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)){
            throw new BadRequestException('No son números.')
        }else{
            return Number(parametrosRuta.edad) + Number(parametrosRuta.altura);
        }

    }
}