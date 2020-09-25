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
import {UsuarioEntity} from "../usuario/usuario.entity";
import {GeneroUpdateDto} from "./dto/genero.update-dto";
import {GeneroEntity} from "./genero.entity";

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

        return response.render('genero/index', {arregloGeneros: resultadoEncontrado, mensaje: parametrosConsulta.mensaje, error: parametrosConsulta.error});
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
        return response.render('genero/crear',
            {error: parametrosConsulta.error, nombre:parametrosConsulta.nombre,
            anio:parametrosConsulta.anio,
            pais:parametrosConsulta.pais,
            derivado:parametrosConsulta.derivado,
            artista:parametrosConsulta.artista
            })
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
            var previousData= `&nombre=${parametrosCuerpo.nombre}&anio=${parametrosCuerpo.anio}&derivado=${parametrosCuerpo.derivado}&pais=${parametrosCuerpo.pais}&artista=${parametrosCuerpo.artista}`;
            return response.redirect('/genero/crear?error=Ingrese datos válidos'+previousData);
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
                return response.redirect('/genero?mensaje=Género Creado');
            } else {
                const mensajeError = 'Error creando usuario'
                return response.redirect('/genero/crear?error=' + mensajeError);
            }
        }
    }
    @Get('editar/:id')
    async editarGenero(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ){
        const id = Number(parametrosRuta.id)
        let generoEncontrado;
        try {
            generoEncontrado = await this._generoService.buscarUno(id)
        }catch(error){
            console.error('Error del servidor');
            return res.redirect('/genero?error= Error buscando género');
        }
        if(generoEncontrado){
            return res.render(
                'genero/crear',
                {
                    error: parametrosConsulta.error,
                    genero: generoEncontrado
                }
            )
        }else {
            return res.redirect('/genero?error= Género no encontrado')
        }

    }
    @Post('editar/:id')
    async editarGenre(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const generoValido = new GeneroUpdateDto();
        generoValido.anio = Number(parametrosCuerpo.anio);
        generoValido.pais_origen = parametrosCuerpo.pais;
        generoValido.genero_derivado = parametrosCuerpo.derivado;
        generoValido.artista_notorio = parametrosCuerpo.artista;
        const existenErrores: ValidationError[] = await validate(generoValido);
        const generoEditado = {
            id:Number(parametrosRuta.id),
            anio: parametrosCuerpo.anio,
            pais: parametrosCuerpo.pais,
            derivado: parametrosCuerpo.derivado,
            artista: parametrosCuerpo.artista

        } as GeneroEntity;
        if(existenErrores.length > 0){
            console.error('Erroress:',existenErrores);
            //throw new BadRequestException('Error validando.');
            return res.redirect('/genero/editar/'+parametrosRuta.id+'?error=Ingrese datos válidos')
        }else {
            try{
                await this._generoService.editarUno(generoEditado)
                return res.redirect('/genero?mensaje=Género editado.')
            }catch (error){
                console.error(error);
                return res.redirect('/genero?error=Error editando género.')
            }
        }

    }
    @Post('eliminar/:id')
    async eliminar(
        @Param() parametrosRuta,
        @Res() res
    ){
        try{
            await this._generoService.eliminarUno(Number(parametrosRuta.id))
            return res.redirect('/genero?mensaje=Género eliminado')
        }catch(error){
            console.log(error)
            return res.redirect('/genero?error=Error eliminando género')
        }
    }
}