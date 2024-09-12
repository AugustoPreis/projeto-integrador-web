import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcao } from './Funcao';

@Entity({ name: 'funcionario' })
export class Funcionario {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'login' })
  login: string;

  @Column({ name: 'senha', select: false })
  senha: string;

  @Column({ name: 'ativo' })
  ativo: boolean;

  @Column({ name: 'adm' })
  adm: boolean;

  @ManyToOne(() => Funcao)
  @JoinColumn({ name: 'funcao' })
  funcao: Funcao;
}