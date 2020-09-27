import {
    IsAlpha,
    IsNotEmpty,
    IsNumber,
    IsPositive, IsString,
} from "class-validator";
export class GeneroUpdateDto{
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