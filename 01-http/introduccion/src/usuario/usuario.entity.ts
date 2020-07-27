import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' //Nombres de las propiedades en la clase
])
@Index(['nombre', 'apellido', 'cedula'],{unique: true}) //Índice compuesto (uniqueness en registro por cada field especificado)
@Entity('epn_usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;
    @Column({
        name: 'nombre',
        type: 'varchar',
        length: '60'
    })
    nombre?: string
    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length:'60'
    })
    apellido?:string
    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length:'18'
    })
    cedula: string;
    @Column({
        nullable: true,
        type: 'decimal',
        precision: 10, // Decimales a la izquierda
        scale: 4, // Decimales a la derecha
        name: 'sueldo'
    })
    sueldo?: number
    @Column({
        nullable: true,
        type:'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: number
    @Column({
        nullable: true,
        type:'datetime',
        name:'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?: number

}