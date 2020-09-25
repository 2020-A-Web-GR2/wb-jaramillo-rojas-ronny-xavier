import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
@Index(['nombre'],{unique: true})
@Entity('genero_musical')
export class GeneroEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;
    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: false
    })
    nombre: string
    @Column({
        name: 'anio',
        type: 'int',
        nullable: true,
    })
    anio?: number
    @Column({
        name: 'pais_origen',
        type: 'varchar',
        nullable: true,
        length: '40'
    })
    pais?: string;
    @Column({
        name: 'genero_derivado',
        type: 'varchar',
        nullable: true,
        length: '40'
    })
    derivado?: string;
    @Column({
        name: 'artista_notorio',
        type: 'varchar',
        nullable: true,
        length: '40'
    })
    artista?: string
}