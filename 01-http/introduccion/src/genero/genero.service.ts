import {Injectable} from "@nestjs/common";
import {GeneroEntity} from "./genero.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, FindManyOptions, In, IsNull, LessThan, Like, MoreThan, MoreThanOrEqual, Not} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";



@Injectable()
export class GeneroService {
    constructor(
        //Inyección de Dependencias
        @InjectRepository(GeneroEntity)
        private repositorio: Repository<GeneroEntity>
    ) {

    }
    buscarPorNombre(textoDeConsulta?: String) {
        const consulta: FindManyOptions<GeneroEntity> ={
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Devuelve una promesa
    }
    buscarPorPais(textoDeConsulta?: String) {
        const consulta: FindManyOptions<GeneroEntity> ={
            where: [
                {
                    pais: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Devuelve una promesa
    }
    crearUno(nuevoGenero:GeneroEntity){
        return this.repositorio.save(nuevoGenero) //Devuelve una promesa
    }
    buscarTodos(){
        return this.repositorio.find() //Devuelve una promesa
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id) //Devuelve una promesa
    }
    editarUno(generoEditado: GeneroEntity){
        return this.repositorio.save(generoEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}