import { ProdutoController } from './produtoController';
import { ProdutoRepository } from './produtoRepository';
import { ProdutoValidator } from './produtoValidator';
import { produtoRoutes } from './produtoRoutes';

const produtoController = new ProdutoController();
const produtoRepository = new ProdutoRepository();
const produtoValidator = new ProdutoValidator();

export {
  produtoController,
  produtoRepository,
  produtoValidator,
  produtoRoutes,
}