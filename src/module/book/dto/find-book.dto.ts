import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class findBookDto {
    @ApiProperty()
    @IsString()
    bookname:string
}