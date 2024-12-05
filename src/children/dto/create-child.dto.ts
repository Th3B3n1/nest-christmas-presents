import { IsBoolean, IsString } from "class-validator";

export class CreateChildDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsBoolean()
    well_behaved: boolean;
}
