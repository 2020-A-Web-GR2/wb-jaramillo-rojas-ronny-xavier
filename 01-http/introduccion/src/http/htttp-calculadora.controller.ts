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
    Headers, Put
} from "@nestjs/common";
import {isNumeric} from "rxjs/internal-compatibility";

@Controller('calc-http')

export class HtttpCalculadoraController{
    @Get('cookie')
    obtenerCookie(
        @Query() parametrosConsulta,
        @Res() res
    )
    {
        res.cookie(
            'Usuario',
            parametrosConsulta.usuario
        )
        res.send({
            mensaje: 'ok'
        })
    }
    //http://localhost:3001/calc-http/calcular?numero1=10&numero2=20
    @Get('calcular')
    @HttpCode(200)
    parametrosconsulta(
        @Query() parametrosDeConsulta,
        @Req() req
    ){
        if(req.cookies['Usuario']) {
            var num1 = parametrosDeConsulta.numero1;
            var num2 = parametrosDeConsulta.numero2;
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('No son números.');
            } else {
                return Number(num1) + Number(num2);
            }
        }else{
            throw new BadRequestException('No tiene la cookie! - Dirígase hacia http://localhost:3001/calc-http/cookie?usuario=nombreusuario');
        }
    }
    //http://localhost:3001/calc-http/calcular/10
    //{"numero1" : 5}
    @Put('/calcular/:numero2')
    @HttpCode(201)
    async bodyParams(
        @Body() bodyParams,
        @Param() pathParams,
        @Req() req
    ){
        if(req.cookies['Usuario']) {
            var num1 = bodyParams.numero1;
            var num2 = pathParams.numero2;
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('No son números.');
            } else {
                return Number(num1) - Number(num2);
            }
        }else{
            throw new BadRequestException('No tiene la cookie! - Dirígase hacia http://localhost:3001/calc-http/cookie?usuario=nombreusuario');
        }
    }
    //http://localhost:3001/calc-http/calcular?numero2=10
    //numero1 = 15
    @Delete('calcular')
    @HttpCode(200)
    cabeceras(
        @Headers() headers,
        @Query() queryparams,
        @Req() req
    ){
        if(req.cookies['Usuario']) {
            var num1 = headers.numero1;
            var num2 = queryparams.numero2;
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('No son números.');
            } else {
                return Number(num1) * Number(num2);
            }
        }else{
            throw new BadRequestException('No tiene la cookie! - Dirígase hacia http://localhost:3001/calc-http/cookie?usuario=nombreusuario');
        }
    }
    //http://localhost:3001/calc-http/calcular/25?numero2=50
    @Post('/calcular/:numero1')
    @HttpCode(201)
    parametrosruta(
        @Param() pathparams,
        @Query() queryparams,
        @Req() req
    ){
        if(req.cookies['Usuario']) {
            var num1 = pathparams.numero1;
            var num2 = queryparams.numero2;
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('No son números.');
            } else {
                if (num2 == 0) {
                    throw new BadRequestException('El segundo número no puede ser cero!');
                } else {
                    return num1 / num2;
                }
            }
        }else{
            throw new BadRequestException('No tiene la cookie! - Dirígase hacia http://localhost:3001/calc-http/cookie?usuario=nombreusuario');
        }
    }

}