import { Etnia, Sexo } from "src/modules/relaciones/entities/relacione.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudiantes.estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  nombre: string;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  paterno: string;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  materno: string;

  @OneToOne(() => Sexo)
  sexo_id: number;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  direccion: string;

  @OneToOne(() => Etnia)
  etnia_id: number;

  @Column({ type: 'date', nullable: false })
  created_at: Date;

  @Column({ type: 'date', nullable: false })
  update_at: Date;
}