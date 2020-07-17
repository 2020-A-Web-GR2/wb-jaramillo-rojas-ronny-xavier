import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res,
    Headers
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

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
    @Get('parametros-consulta')
    parametrosconsulta(
        @Query() parametrosDeConsulta
    ){
        console.log('parametrosDeConsulta',parametrosDeConsulta);
        if(parametrosDeConsulta.nombre && parametrosDeConsulta.apellido){
            return parametrosDeConsulta.nombre+' '+parametrosDeConsulta.apellido;
        }else{
            return "=)";
        }

    }
    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        //Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;
        try{
            const existenErrores: ValidationError[] = await validate(mascotaValida);
            if(existenErrores.length > 0){
                console.error('Errores:',existenErrores);
                throw new BadRequestException('Error validando.');
            }else{
                return {
                    mensaje: 'Se creo correctamente'
                }
            }
        }catch (e){
            console.error('Error',e);
            throw new BadRequestException('Error validando.');
        }
        console.log('Parametros de cuerpo', parametrosDeCuerpo);
        return 'Registro Creado';
    }
    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //Request
        @Res() res //Response
    ){
        res.cookie(
            'galletaInsegura', //nombre
            'Tengo hambre' //valor
        );
        res.send({ //Método EXPRESSJS
            mensaje: 'ok'
        })
        //NO se puede usar return cuando se usa @Res()!!!!!!!!!!!!!!!!!!
    }
    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Req() req, //Request
        @Res() res //Response
    ){
        res.cookie(
            'galletaSegura', //nombre
            'Ya no tengo hambre.', //valor
            {
                secure : true
            }
        );
        res.send({ //Método EXPRESSJS
            mensaje: 'ok'
        })
        //NO se puede usar return cuando se usa @Res()!!!!!!!!!!!!!!!!!!
    }
    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req //Si no usamos 'res', sí podemos usar el return.
    ){
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }
        return mensaje;
    }
    @Get('guardarCookieFirmada')
    guardarCookieFirmada(
        @Res() res,
    @Headers() headers //-> Cabecera de petición
    ){
        //res.headers -> Cabecera de respuesta
        res.cookie('firmada','poliburguer',{signed:true});
        const mensaje = {
            mensaje : 'ok'
        };
        res.send(mensaje)
    }

}