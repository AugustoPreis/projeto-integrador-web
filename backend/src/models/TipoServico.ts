import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo_servico' })
export class TipoServico {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'pagador' })
  pagador: string;
}