import { IsNumber, IsString } from "class-validator";


export class CreateToyDto {
    @IsString()
    name: string;

    @IsString()
    material: string;

    @IsNumber()
    weight: number;
}
