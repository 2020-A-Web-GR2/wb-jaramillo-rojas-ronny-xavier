import {
    IsAlpha, IsAlphanumeric,
    IsNotEmpty,
    IsNumber,
    IsPositive,
} from "class-validator";
export class GeneroCreateDto{
    @IsNotEmpty()
    nombre: string
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    anio: number
    @IsNotEmpty()
    pais_origen: string
    @IsNotEmpty()
    genero_derivado: string
    @IsNotEmpty()
    artista_notorio: string

}