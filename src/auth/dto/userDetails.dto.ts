import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';
export class userDto {
  @IsString()
  userName;

  @IsOptional()
  @IsNumber()
  income;

  @IsOptional()
  @IsNumber()
  expansive;

  @IsOptional()
  @IsNumber()
  expensiveCategories;

  @IsOptional()
  @IsNumber()
  incomeCategories;
}
