import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, isNotEmpty, isString } from "class-validator";

export class CreateAuthDto {
    createQueryBuilder() {
      throw new Error('Method not implemented.');
    }
    @ApiProperty()
    @IsStrongPassword()
    password:string

    @ApiProperty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsString() 
    firstname:string

    @ApiProperty()
    @IsString()
    lastname:string

    @IsString()
    @IsOptional()
    refresh_token:string

    @IsString()
    @IsOptional()
    role:string


    @IsOptional()
    telegramID:string
}
