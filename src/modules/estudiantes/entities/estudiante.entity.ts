import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sexo, Etnia } from 'src/modules/relaciones/relacione.entity';

@Entity({ schema: 'estudiantes', name: 'estudiante' })
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', nullable: false, length: 60 })
  nombres!: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  paterno!: string;

  @Column({ type: 'varchar', nullable: true, length: 30 })
  materno?: string;

  @Column({ type: 'varchar', nullable: true, length: 200 })
  direccion!: string;

  @Column({ type: 'integer', nullable: false })
  sexo_id!: number;

  @Column({ type: 'integer', nullable: false })
  etnia_id!: number;

  @Column({ type: 'integer', nullable: true })
  foto_perfil_id?: number;

  @ManyToOne(() => Etnia)
  @JoinColumn({ name: 'etnia_id', referencedColumnName: 'id' })
  etnia!: Etnia;

  @ManyToOne(() => Sexo)
  @JoinColumn({ name: 'sexo_id', referencedColumnName: 'id' })
  sexo!: Sexo;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
