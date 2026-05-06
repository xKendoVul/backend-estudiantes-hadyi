import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Etnia, Sexo } from "./relacione.entity";
import { Repository } from "typeorm";
import { CreateEtniaDto, CreateSexoDto } from "./create-relacione.dto";


@Injectable()
export class RelacionesService {
  constructor(
    @InjectRepository(Sexo)
    private readonly SexoRepo: Repository<Sexo>,
    @InjectRepository(Etnia)
    private readonly EtniaRepo: Repository<Etnia>
  ) { }

  async createSexo(sexoDto: CreateSexoDto) {
    try {
      const sexo = this.SexoRepo.create(sexoDto);
      return await this.SexoRepo.save(sexo)
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllSexos() {
    return await this.SexoRepo.find();
  }

  // ----------------------------------------

  async createEtnia(etniaDto: CreateEtniaDto) {
    try {
      const etnia = this.EtniaRepo.create(etniaDto)
      return await this.EtniaRepo.save(etnia)
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findAllEtnias() {
    return await this.EtniaRepo.find();
  }

}