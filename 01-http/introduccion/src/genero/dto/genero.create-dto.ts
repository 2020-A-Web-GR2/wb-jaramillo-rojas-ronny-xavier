import {
    IsAlpha, IsAlphanumeric,IsString,
    IsNotEmpty,
    IsNumber,
    IsPositive,
} from "class-validator";
export class GeneroCreateDto{
    @IsNotEmpty()
    @IsString()
    nombre: string
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    anio: number
    @IsNotEmpty()
    @IsString()
    pais_origen: string
    @IsNotEmpty()
    @IsString()
    genero_derivado: string
    @IsNotEmpty()
    @IsString()
    artista_notorio: string

}