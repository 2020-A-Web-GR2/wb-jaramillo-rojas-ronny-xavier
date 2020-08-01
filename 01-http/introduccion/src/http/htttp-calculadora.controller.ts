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
        res.cookie(
            'Puntaje',
            100,
            {signed: true}
        )
        res.send({
            'Usuario': parametrosConsulta.usuario,
            'Puntaje': 100
        })
    }
    //http://localhost:3001/calc-http/calcular?numero1=10&numero2=20
    @Get('calcular')
    @HttpCode(200)
    parametrosconsulta(
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ){
        if(req.cookies['Usuario']) {
            var num1 = parametrosDeConsulta.numero1;
            var num2 = parametrosDeConsulta.numero2;
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('No son números.');
            } else {
                var current = Number(req.signedCookies['Puntaje']);
                var calc =  Number(num1) + Number(num2);
                var resp ={
                   'Usuario:':req.cookies['Usuario'],
                    'Operación:':'Suma',
                    'Respuesta:':calc,
                   'Puntaje Inicial:':req.signedCookies['Puntaje'],
                    'Puntaje Final:': current-calc
                }
                if(this.verify_cookie(current,calc)){
                    res.cookie('Puntaje',100,{signed:true},{overwrite:true})
                    resp['Aviso'] =req.cookies['Usuario']+", se te acabaron tus puntos. Se te han reestablecido de nuevo."
                    res.send(resp)
                }else{
                    res.cookie('Puntaje',resp["Puntaje Final:"], {signed:true},{overwrite:true})
                    res.send(resp)
                }
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
        @Req() req,
        @Res() res
    ){
        if(req.cookies['Usuario']) {
            var num1 = bodyParams.numero1;
            var num2 = pathParams.numero2;
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('No son números.');
            } else {
                var current = Number(req.signedCookies['Puntaje']);
                var calc =  Number(num1) - Number(num2);
                var resp ={
                    'Usuario:':req.cookies['Usuario'],
                    'Operación:':'Resta',
                    'Respuesta:':calc,
                    'Puntaje Inicial:':req.signedCookies['Puntaje'],
                    'Puntaje Final:': current-Math.abs(calc)
                }
                if(this.verify_cookie(current,Math.abs(calc))){
                    res.cookie('Puntaje',100,{signed:true},{overwrite:true})
                    resp['Aviso'] =req.cookies['Usuario']+", se te acabaron tus puntos. Se te han reestablecido de nuevo."
                    res.send(resp)
                }else{
                    res.cookie('Puntaje',resp["Puntaje Final:"], {signed:true},{overwrite:true})
                    res.send(resp)
                }
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
        @Req() req,
        @Res() res
    ){
        if(req.cookies['Usuario']) {
            var num1 = headers.numero1;
            var num2 = queryparams.numero2;
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('No son números.');
            } else {
                var current = Number(req.signedCookies['Puntaje']);
                var calc =  Number(num1) * Number(num2);
                var resp ={
                    'Usuario:':req.cookies['Usuario'],
                    'Operación:':'Multiplicación',
                    'Respuesta:':calc,
                    'Puntaje Inicial:':req.signedCookies['Puntaje'],
                    'Puntaje Final:': current-Math.abs(calc)
                }
                if(this.verify_cookie(current,Math.abs(calc))){
                    res.cookie('Puntaje',100,{signed:true},{overwrite:true})
                    resp['Aviso'] =req.cookies['Usuario']+", se te acabaron tus puntos. Se te han reestablecido de nuevo."
                    res.send(resp)
                }else{
                    res.cookie('Puntaje',resp["Puntaje Final:"], {signed:true},{overwrite:true})
                    res.send(resp)
                }
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
        @Req() req,
        @Res() res
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
                    var current = Number(req.signedCookies['Puntaje']);
                    var calc =  Number(num1) / Number(num2);
                    var resp ={
                        'Usuario:':req.cookies['Usuario'],
                        'Operación:':'División',
                        'Respuesta:':calc,
                        'Puntaje Inicial:':req.signedCookies['Puntaje'],
                        'Puntaje Final:': current-Math.abs(calc)
                    }
                    if(this.verify_cookie(current,Math.abs(calc))){
                        res.cookie('Puntaje',100,{signed:true},{overwrite:true})
                        resp['Aviso'] =req.cookies['Usuario']+", se te acabaron tus puntos. Se te han reestablecido de nuevo."
                        res.send(resp)
                    }else{
                        res.cookie('Puntaje',resp["Puntaje Final:"], {signed:true},{overwrite:true})
                        res.send(resp)
                    }
                }
            }
        }else{
            throw new BadRequestException('No tiene la cookie! - Dirígase hacia http://localhost:3001/calc-http/cookie?usuario=nombreusuario');
        }
    }
   verify_cookie(current: number, next: number){
        if(current-next<=0){
            return true;
        }else{
            return false;
        }
   }
}