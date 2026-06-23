import { Controller } from '@nestjs/common';
import { RelacionesService } from './relaciones.service';
import { CreateSexoDto, CreateEtniaDto } from './create-relacione.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SexoController {
  constructor(private readonly relacionesService: RelacionesService) {}

  @MessagePattern({ cmd: 'crear_sexo' })
  async createSexo(@Payload() sexoDto: CreateSexoDto) {
    const sexo = await this.relacionesService.createSexo(sexoDto);

    const datos = {
      data: sexo,
      message: 'Registro agregado con exito',
    };
    return datos;
  }

  @MessagePattern({ cmd: 'encontrar_sexos' })
  async findAllSexos() {
    const data = await this.relacionesService.findAllSexos();
    return data;
  }
}

@Controller()
export class EtniaController {
  constructor(private readonly relacionesService: RelacionesService) {}

  @MessagePattern({ cmd: 'crear_etnia' })
  async create(@Payload() etniaDto: CreateEtniaDto) {
    const etnia = await this.relacionesService.createEtnia(etniaDto);

    const datos = {
      data: etnia,
      message: 'Registro agregado con exito',
    };
    return datos;
  }

  @MessagePattern({ cmd: 'encontrar_etnias' })
  async findAll() {
    const data = await this.relacionesService.findAllEtnias();
    return data;
  }
}
