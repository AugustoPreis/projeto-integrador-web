import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Servico } from './Servico';
import { Funcionario } from './Funcionario';

@Entity({ name: 'servico_funcionario' })
export class ServicoFuncionario {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'status' })
  status: string;

  @ManyToOne(() => Servico)
  @JoinColumn({ name: 'servico' })
  servico: Servico;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario' })
  funcionario: Funcionario;

  @Column({ name: 'observacao' })
  observacao: string;

  @Column({ name: 'data_cadastro' })
  dataCadastro: Date;
}