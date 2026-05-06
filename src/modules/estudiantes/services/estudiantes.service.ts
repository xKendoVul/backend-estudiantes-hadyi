import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateEstudianteDto } from '../dto/estudiante.dto'
import { UpdateEstudianteDto } from '../dto/estudiante.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    private readonly dataSource: DataSource
  ) { }

  async getAll() {
    const rows = this.dataSource
      .getRepository(Estudiante)
      .createQueryBuilder('estudiantes')
      .where('estudiantes.id is not null');

    return await rows.getMany();
  }

  async getOne(id: number) {
    return await this.estudianteRepo.findOne({
      where: { id },
      relations: [
        'sexo',
        'etnia'
      ]
    });
  }

  async create(estudianteDto: CreateEstudianteDto) {
    try {
      const estudiante = this.estudianteRepo.create(estudianteDto);
      const saved = await this.estudianteRepo.save(estudiante);
      return await this.estudianteRepo.findOne({
        where: { id: saved.id },
        relations: ['sexo', 'etnia']
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, estudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.estudianteRepo.findOne({ where: { id } });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }

    try {
      this.estudianteRepo.merge(estudiante, estudianteDto);
      await this.estudianteRepo.save(estudiante);

      return await this.estudianteRepo.findOne({
        where: { id },
        relations: ['sexo', 'etnia']
      });
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async delete(id: number) {
    const estudiante = await this.getOne(id);

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }

    return await this.estudianteRepo.delete({ id });
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
