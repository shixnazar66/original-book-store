import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateSavedDto {
    @ApiProperty()
    @IsNumber()
    userid:number


    @ApiProperty()
    @IsNumber()
    bookid:number
}
