import {
    IsAlpha, IsAlphanumeric,
    IsNotEmpty,
    IsNumber,
    IsPositive,
} from "class-validator";
export class GeneroCreateDto{
    @IsNotEmpty()
    @IsAlpha()
    nombre: string
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    anio: number
    @IsAlpha()
    @IsNotEmpty()
    pais_origen: string
    @IsAlpha()
    @IsNotEmpty()
    genero_derivado: string
    @IsAlpha()
    @IsNotEmpty()
    artista_notorio: string

}