import { IsIn, IsNumber, IsString } from "class-validator";


export class CreateToyDto {
    @IsString()
    name: string;

    @IsString()
    @IsIn(["wood", "metal", "plastic", "other"])
    material: string;

    @IsNumber()
    weight: number;
}
