/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReseñaDto {
    
    @IsString()
    @IsNotEmpty()
    comentario: string;

    @IsNumber()
    @IsNotEmpty()
    calificacion: number;

    @IsString()
    @IsNotEmpty()
    fecha: string;

}
