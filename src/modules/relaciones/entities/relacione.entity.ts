import { Entity, PrimaryGeneratedColumn } from "typeorm";
export class Relacione { }

@Entity()
export class Sexo {
  @PrimaryGeneratedColumn('increment')
  id?: number;
  sexo: string;
  created_at: Date;
  update_at: Date
}

@Entity()
export class Etnia {
  @PrimaryGeneratedColumn('increment')
  id?: number;
  etnia: string;
  created_at: Date;
  update_at: Date
}