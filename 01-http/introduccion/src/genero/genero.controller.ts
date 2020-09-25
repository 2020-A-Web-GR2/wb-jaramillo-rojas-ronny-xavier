import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {GeneroService} from "./genero.service";
import {validate, ValidationError} from "class-validator";
import {GeneroCreateDto} from "./dto/genero.create-dto";

@Controller('genero')
export class GeneroController {

    constructor (
        private readonly _generoService:GeneroService){
    }
    @Get()
    async index(
        @Res() response,
        @Query() parametrosConsulta
    ){
        let resultadoEncontrado;
        if(parametrosConsulta.busquedaNombre || parametrosConsulta.busquedaPais){
            console.log("ENTRA PRIMERO")
            try{
                if(parametrosConsulta.busquedaNombre){
                    resultadoEncontrado = await this._generoService.buscarPorNombre(parametrosConsulta.busquedaNombre);
                }else if(parametrosConsulta.busquedaPais){
                    resultadoEncontrado = await this._generoService.buscarPorPais(parametrosConsulta.busquedaPais);
                }
            } catch (error){
                console.log(error)
                throw new InternalServerErrorException('Error encontrando géneros.')
            }
        }else{
            console.log("ENTRA")
            try{
                resultadoEncontrado = await this._generoService.buscarTodos();
            } catch (error){
                throw new InternalServerErrorException('Error encontrando géneros.')
            }
        }

        return response.render('genero/index', {arregloGeneros: resultadoEncontrado});
        /*if (resultadoEncontrado){
            console.log(resultadoEncontrado)
            return response.render('genero/index', {arregloGeneros: resultadoEncontrado});
        }else{
            return response.render('genero/index', {arregloGeneros: resultadoEncontrado});
            //throw new NotFoundException('No se encontraron generos.')
        }*/
    }
    @Get('crear')
    createVista(
        @Res() response,
        @Query() parametrosConsulta
    ){
        return response.render('genero/crear',{error: parametrosConsulta.error})
    }
    @Post('crear')
    async create(
        @Body() parametrosCuerpo,
        @Res() response
    ){
        const generoValido = new GeneroCreateDto();
        generoValido.nombre = parametrosCuerpo.nombre;
        generoValido.anio = Number(parametrosCuerpo.anio);
        generoValido.pais_origen = parametrosCuerpo.pais;
        generoValido.genero_derivado = parametrosCuerpo.derivado;
        generoValido.artista_notorio = parametrosCuerpo.artista;
        const existenErrores: ValidationError[] = await validate(generoValido);
        if(existenErrores.length > 0){
            console.error('Errores:',existenErrores);
            //throw new BadRequestException('Error validando.');
            return response.redirect('/genero/crear?error=Ingrese datos válidos')
        }else {
            let respuestaCreacionGenero;
            try {
                respuestaCreacionGenero = await this._generoService.crearUno(parametrosCuerpo);
            } catch (error) {
                console.error(error);
                const mensajeError = 'Error creando usuario'
                return response.redirect('/genero/crear?error=' + mensajeError)
            }
            if (respuestaCreacionGenero) {
                return response.redirect('/genero');
            } else {
                const mensajeError = 'Error creando usuario'
                return response.redirect('/genero/crear?error=' + mensajeError);
            }
        }
    }

}