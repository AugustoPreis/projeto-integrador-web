import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'funcao' })
export class Funcao {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'descricao' })
  descricao: string;
}