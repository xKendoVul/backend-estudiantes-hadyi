import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etnia, Sexo } from './relacione.entity';
import { Repository } from 'typeorm';
import { CreateEtniaDto, CreateSexoDto } from './create-relacione.dto';

@Injectable()
export class RelacionesService {
  constructor(
    @InjectRepository(Sexo)
    private readonly sexoRepo: Repository<Sexo>,
    @InjectRepository(Etnia)
    private readonly etniaRepo: Repository<Etnia>,
  ) {}

  async createSexo(sexoDto: CreateSexoDto) {
    try {
      const sexo = this.sexoRepo.create(sexoDto);
      return this.sexoRepo.save(sexo);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAllSexos() {
    return this.sexoRepo.find();
  }

  async createEtnia(etniaDto: CreateEtniaDto) {
    try {
      const etnia = this.etniaRepo.create(etniaDto);
      return this.etniaRepo.save(etnia);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAllEtnias() {
    return this.etniaRepo.find();
  }

  private handleDBException(error: any & { code?: string; detail?: string }) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
