import {
    IsArray,
    IsDateString,
    IsNumber,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  

export class BalanceDto {
    @IsDateString()
    date: string;
  
    @IsNumber()
    balance: number;
}

export class MovementDto {
    @IsNumber()
    id: number;
  
    @IsDateString()
    date: string;
  
    @IsString()
    wording: string;
  
    @IsNumber()
    amount: number;
}


export class ValidateMovementsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MovementDto)
    movements: MovementDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BalanceDto)
    balances: BalanceDto[];
}