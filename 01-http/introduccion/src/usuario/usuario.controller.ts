import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('usuario')
export class UsuarioController{
    public arregloUsuarios = [
        {
            id:1,
            nombre:"Ronny"
        },
        {
            id:2,
            nombre:"Xavier"
        },
        {
            id:3,
            nombre:"John"
        }
    ]
    public idActual = 3;
    constructor (private readonly _usuarioService:UsuarioService){

    }
    @Get()
    async mostrarTodos(){
        try{
            const respuesta = await this._usuarioService.buscarTodos()
            return respuesta
        }catch (e){
            console.error(e)
            throw new InternalServerErrorException({
            mensaje:'Error del servidor'},
            )
        }

        //return this.arregloUsuarios
    }
    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        //Validacion del create DTO
        const usuarioValido = new UsuarioCreateDto();
        usuarioValido.cedula = parametrosCuerpo.cedula;
        usuarioValido.nombre = parametrosCuerpo.nombre;
        usuarioValido.apellido = parametrosCuerpo.apellido;
        usuarioValido.sueldo = parametrosCuerpo.sueldo;
        usuarioValido.fecha_nacimiento = parametrosCuerpo.fechaNacimiento;
        usuarioValido.fecha_hora_nacimiento = parametrosCuerpo.fechaHoraNacimiento;
        try{
            const existenErrores: ValidationError[] = await validate(usuarioValido);
            if(existenErrores.length > 0){
                console.error('Errores:',existenErrores);
                throw new BadRequestException('Error validando.');
            }else{
                const respuesta = await this._usuarioService.crearUno(parametrosCuerpo)
                return respuesta
            }

        }catch (e){
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
        //const nuevoUsuario = {
        //    id:this.idActual+1,
        //    nombre: parametrosCuerpo.nombre
        //}
        //this.arregloUsuarios.push(nuevoUsuario);
        //this.idActual = this.idActual + 1
        //return nuevoUsuario
    }
    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        let respuesta;
        try{
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
        }catch (e){
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error del servidor'},
            )
        }
        if (respuesta){
            return respuesta
        }else{
            throw new NotFoundException({
                mensaje:'No existen registros'
            })
        }
       // const indice = this.arregloUsuarios.findIndex(
       //     (usuario) => usuario.id === Number(parametrosRuta.id)
       // )
       // return this.arregloUsuarios[indice];
    }
    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const usuarioValido = new UsuarioCreateDto();
        usuarioValido.cedula = parametrosCuerpo.cedula;
        usuarioValido.nombre = parametrosCuerpo.nombre;
        usuarioValido.apellido = parametrosCuerpo.apellido;
        usuarioValido.sueldo = parametrosCuerpo.sueldo;
        usuarioValido.fecha_nacimiento = parametrosCuerpo.fechaNacimiento;
        usuarioValido.fecha_hora_nacimiento = parametrosCuerpo.fechaHoraNacimiento;

        const existenErrores: ValidationError[] = await validate(usuarioValido);
        if(existenErrores.length > 0){
            console.error('Errores:',existenErrores);
            throw new BadRequestException('Error validando.');
        }else {
            const id = Number(parametrosRuta.id);
            const usuarioEditado = parametrosCuerpo;
            usuarioEditado.id = id;

            try{
                const respuesta = await this._usuarioService.editarUno(usuarioEditado);
                return respuesta;
            }catch (e){
                console.error(e)
                throw new InternalServerErrorException({
                    mensaje:'Error del servidor'},
                )
            }
        }

       // const indice = this.arregloUsuarios.findIndex(
       //     (usuario) => usuario.id === Number(parametrosRuta.id)
       // );
       // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre
       // return this.arregloUsuarios[indice];
    }
    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try{
            const respuesta = await this._usuarioService.eliminarUno(id);
            if (respuesta.affected>0){
                console.log(respuesta)
                return{
                    mensaje:'Registro con id '+id+' eliminado'
                };
            }else{
                console.log(respuesta)
                return{
                    mensaje:'No se eliminó el registro especificado.'
                };
            }
        }catch (e){
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
        //const indice = this.arregloUsuarios.findIndex(
        //    (usuario) => usuario.id === Number(parametrosRuta.id)
        //);
        //this.arregloUsuarios.splice(indice, 1)
        //return this.arregloUsuarios[indice]
    }

}