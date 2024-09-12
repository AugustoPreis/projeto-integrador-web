import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cliente' })
export class Cliente {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'telefone' })
  telefone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'login' })
  login: string;

  @Column({ name: 'senha', select: false })
  senha: string;

  @Column({ name: 'ativo' })
  ativo: boolean;

  @Column({ name: 'inicio_acesso' })
  inicioAcesso: Date;

  @Column({ name: 'fim_acesso' })
  fimAcesso: Date;
} 