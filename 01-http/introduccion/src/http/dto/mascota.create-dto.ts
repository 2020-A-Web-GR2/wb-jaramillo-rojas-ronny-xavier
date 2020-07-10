// @IsAlpha()
// @IsNotEmpty()
// @MaxLength()
// @MinLength()
// @IsBoolean()
// @IsEmpty()
import {
    IsAlpha,
    IsBoolean,
    IsEmpty,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    Length
} from "class-validator";

export class MascotaCreateDto{
    @Length(3,60)
    @IsAlpha()
    @IsNotEmpty()
    nombre: string;
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    edad: number;
    @IsBoolean()
    @IsNotEmpty()
    casada: boolean;
    @IsBoolean()
    @IsOptional()
    ligada?: boolean; //Atributo opcional
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    peso: number;
}