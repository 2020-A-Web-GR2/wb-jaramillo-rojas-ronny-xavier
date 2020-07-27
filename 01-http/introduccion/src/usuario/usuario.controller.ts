import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

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
    @Get()
    mostrarTodos(){
        return this.arregloUsuarios
    }
    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id:this.idActual+1,
            nombre: parametrosCuerpo.nombre
        }
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1
        return nuevoUsuario
    }
    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
    }
    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre
        return this.arregloUsuarios[indice];
    }
    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuarios.splice(indice, 1)
        return this.arregloUsuarios[indice]
    }

}