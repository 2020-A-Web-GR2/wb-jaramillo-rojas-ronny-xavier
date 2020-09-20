import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, FindManyOptions, In, IsNull, LessThan, Like, MoreThan, MoreThanOrEqual, Not} from "typeorm/index";

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
    buscarTodos(textoDeConsulta?: String){
        /*let busquedaEjemplo : FindManyOptions<UsuarioEntity>
        //Buscar y relacionar
        busquedaEjemplo = {
            relations: ['mascotas', 'mascotas.vacunas']
        }
        //Búsquedas con where
        busquedaEjemplo = {
            where: {
                nombre: 'NoJohn', //Búsqueda exacta &
                apellido: 'Doe'
            }
        }
        //Búsqueda ordenada
        busquedaEjemplo = {
            order: {
               nombre: 'ASC',
               id: 'DESC'
            }
        }
        //Buscar paginación
        busquedaEjemplo = {
            //Primera página
            take: 10, // (0*10) Del total de registros, tomar N registros
            skip: 0 // Del total de registros, saltarse N registros
            //Segunda Pagina
            //take: 10, (1*10) // Del total de registros, tomar N registros
            //skip: 10 // Del total de registros, saltarse 10 registros
            //Tercer Pagina
            //take: 10, (2*10) // Del total de registros, tomar N registros
            //skip: 20 // Del total de registros, saltarse 20 registros
        }
        //Busqueda where OR
        busquedaEjemplo = {
            where:[
                {
                    nombre:'NoJohn', //AND
                    apellido: 'Doe'
                }, //OR
                {
                    nombre: 'Adrian', //AND
                    apellido: 'Eguez'
                }
            ]
        }
        //Búsqueda NOT
        busquedaEjemplo = {
            where:[
                {
                    nombre:Not('NoJohn') //Todos los registros donde el nombre no sea igual a value
                }
            ]
        }
        busquedaEjemplo = {
            where:[
                {
                    fechaNacimiento:LessThan('1994-11-05') //Todos los registros donde el la fecha sea menor a value
                }
            ]
        }
        busquedaEjemplo = {
            where:[
                {
                    fechaNacimiento:MoreThan('1994-11-05') //Todos los registros donde el la fecha sea menor a value
                }
            ]
        }
        busquedaEjemplo = {
            where:[
                {
                    fechaNacimiento:MoreThanOrEqual('1994-11-05') //Todos los registros donde el la fecha sea menor a value
                }
            ]
        }
        busquedaEjemplo = {
            where:[
                {
                    nombre:Like('%o%') //Todos los registros donde el nombre coincida con el value
                }
            ]
        }
        busquedaEjemplo = {
            where:[
                {
                    fechaNacimiento:Between('1990','2020') //Todos los registros donde el la fecha esté entre los values
                }
            ]
        }
        busquedaEjemplo = {
            where:[
                {
                    id:In([1,2,3,4,5]) //
                }
            ]
        }
        busquedaEjemplo = {
            where:[
                {
                    casado:IsNull() //
                }
            ]
        }*/
        const consulta: FindManyOptions<UsuarioEntity> ={
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    apellido: Like(`%${textoDeConsulta}%`)
                },{
                    cedula: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //Devuelve una promesa
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