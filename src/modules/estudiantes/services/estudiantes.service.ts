import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { Repository } from 'typeorm';
import {
  CreateEstudianteDto,
  UpdateEstudianteDto,
} from '../dto/estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
  ) {}

  async getAll(): Promise<Estudiante[]> {
    return this.estudianteRepo.find({ relations: ['sexo', 'etnia'] });
  }

  async getOne(id: number): Promise<Estudiante | null> {
    return await this.estudianteRepo.findOne({
      where: { id },
      relations: ['sexo', 'etnia'],
    });
  }

  async create(estudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    try {
      const estudiante = this.estudianteRepo.create(estudianteDto);
      const saved = await this.estudianteRepo.save(estudiante);
      const result = await this.estudianteRepo.findOne({
        where: { id: saved.id },
        relations: ['sexo', 'etnia'],
      });
      if (!result)
        throw new NotFoundException('Estudiante no encontrado tras crear');
      return result;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async update(payload: UpdateEstudianteDto): Promise<Estudiante> {
    const { id, ...estudianteDto } = payload;
    const estudiante = await this.estudianteRepo.preload({
      id,
      ...estudianteDto,
    });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }

    try {
      return await this.estudianteRepo.save(estudiante);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.estudianteRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
  }

  private handleDBException(
    error: any & { code?: string; detail?: string },
  ): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
