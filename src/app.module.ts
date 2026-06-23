import { Module } from '@nestjs/common';
import { EstudiantesModule } from './modules/estudiantes/estudiantes.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RelacionesModule } from './modules/relaciones/relaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    EstudiantesModule,
    RelacionesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
