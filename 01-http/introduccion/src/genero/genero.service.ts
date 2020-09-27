import {Injectable} from "@nestjs/common";
import {GeneroEntity} from "./genero.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like} from "typeorm/index";




@Injectable()
export class GeneroService {
    constructor(
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
        return this.repositorio.find(consulta)
    }
    buscarPorPais(textoDeConsulta?: String) {
        const consulta: FindManyOptions<GeneroEntity> ={
            where: [
                {
                    pais: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta)
    }
    crearUno(nuevoGenero:GeneroEntity){
        return this.repositorio.save(nuevoGenero)
    }
    buscarTodos(){
        return this.repositorio.find()
    }
    buscarUno(id: number){
        return this.repositorio.findOne(id)
    }
    editarUno(generoEditado: GeneroEntity){
        return this.repositorio.save(generoEditado);
    }
    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }
}