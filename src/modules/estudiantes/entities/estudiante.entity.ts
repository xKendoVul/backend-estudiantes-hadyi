import { Etnia, Sexo } from "src/modules/relaciones/entities/relacione.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ schema: 'estudiantes', name: 'estudiante' })
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  nombres: string;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  paterno: string;

  @Column({ type: 'varchar', nullable: true, length: 60 })
  materno: string;

  @Column({ type: 'int4', nullable: false })
  sexo_id: number;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  direccion: string;

  @Column({ type: 'int4', nullable: false })
  etnia_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}