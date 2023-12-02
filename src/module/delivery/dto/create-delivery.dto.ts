import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDeliveryDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userid:number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    bookid:number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address:string
}
