import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  nombres!: string;

  @IsString()
  @IsNotEmpty()
  paterno!: string;

  @IsString()
  @IsOptional()
  materno?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsNumber()
  @IsNotEmpty()
  sexo_id!: number;

  @IsNumber()
  @IsNotEmpty()
  etnia_id!: number;
}

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
