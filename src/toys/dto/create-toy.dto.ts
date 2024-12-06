import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";


export class CreateToyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(["wood", "metal", "plastic", "other"])
    material: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    weight: number;
}
