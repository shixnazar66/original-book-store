import { Type } from "class-transformer"
import { IsNumber, IsOptional } from "class-validator"

export class findAllDeliveryDto {
    @IsNumber({maxDecimalPlaces:0})
    @IsOptional()
    @Type(() => Number)
    page:number
    
    @IsNumber({maxDecimalPlaces:0})
    @IsOptional()
    @Type(() => Number)
    limit:number
    }