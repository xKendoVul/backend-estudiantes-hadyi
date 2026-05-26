import { Module } from '@nestjs/common';
import { RelacionesService } from './relaciones.service';
import { SexoController, EtniaController } from './relaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etnia, Sexo } from './relacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sexo, Etnia])],
  controllers: [SexoController, EtniaController],
  providers: [RelacionesService],
  exports: [RelacionesModule, TypeOrmModule]
})
export class RelacionesModule { }
