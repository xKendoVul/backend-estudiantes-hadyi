import { Controller, Delete, Get, Param, ParseIntPipe } from "@nestjs/common";
import { EstudiantesService } from "../services/estudiantes.service";
import { CreateEstudianteDto, UpdateEstudianteDto } from "../dto/estudiante.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudianteService: EstudiantesService) { }

  @MessagePattern({ cmd: 'encontrar_todos_estudiantes' })
  async findAll() {
    const rows = await this.estudianteService.getAll();

    const datos = {
      data: rows,
      count: rows.length
    };

    return datos
  }

  @MessagePattern({ cmd: 'encontrar_estudiante' })
  async findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.estudianteService.getOne(id)
  }

  // @Post()
  @MessagePattern({ cmd: 'create_student' })
  async create(@Payload() estudianteDto: CreateEstudianteDto) {
    const estudiante = await this.estudianteService.create(estudianteDto);

    const datos = {
      data: estudiante,
      message: "Registro agregado con exito"
    }
    return datos;
  }

  @MessagePattern({ cmd: "actualizar_estudiante" })
  async update(@Payload() payload: UpdateEstudianteDto) {
    const { id, ...estudianteDto } = payload;
    const estudiante = await this.estudianteService.update(id!, estudianteDto);

    const datos = {
      data: estudiante,
      message: "Actualizacion con exito"
    }
    return datos
  }

  @MessagePattern({ cmd: 'delete_student' })
  delete(@Payload('id', ParseIntPipe) id: number) {
    return this.estudianteService.delete(id)
  }
}