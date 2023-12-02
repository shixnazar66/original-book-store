import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "src/common/enum/user-role.enum";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    firstname: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    lastname: string;
  

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsOptional()
    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
  
    
    @ApiProperty()
    @IsStrongPassword()
    password: string;
}
