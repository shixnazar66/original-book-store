import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateBookDto {
    @ApiProperty()
    @IsString()
    bookname:string

    @ApiProperty()
    @IsString()
    booklanguage:string

    @IsNumber()
    @IsOptional()
    viewcount:number

    @ApiProperty()
    @IsString()
    author:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    money:string
 
    @ApiProperty()
    @IsString()
    pdf:string

    @ApiProperty({default:[1,2,3]})
    @IsNumber({maxDecimalPlaces:0},{each:true})
    categoryID:number[]
}
