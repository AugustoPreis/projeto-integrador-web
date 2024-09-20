import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { Produto } from './Produto';
import { TipoServico } from './TipoServico';

@Entity({ name: 'servico' })
export class Servico {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'numero' })
  numero: number;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'observacao' })
  observacao: string;

  @Column({ name: 'valor', type: 'numeric' })
  valor: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente' })
  cliente: Cliente;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produto' })
  produto: Produto;

  @ManyToOne(() => TipoServico)
  @JoinColumn({ name: 'tipo_servico' })
  tipoServico: TipoServico;

  @Column({ name: 'data_cadastro' })
  dataCadastro: Date;

  @Column({ name: 'ativo' })
  ativo: boolean;
}