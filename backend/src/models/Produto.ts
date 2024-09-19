import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produto' })
export class Produto {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'valor', type: 'numeric' })
  valor: number;

  @Column({ name: 'ativo' })
  ativo: boolean;
}