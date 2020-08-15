import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        //Inyección de Dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ){

    }
    crearUno(nuevoUsuario:UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) //Devuelve una promesa
    }
    buscarTodos(){
        return this.repositorio.find() //Devuelve una promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id) //Devuelve una promesa
    }
    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}