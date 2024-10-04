import 'dotenv/config';

import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

import { version } from '../package.json';
import { errorHandler } from './middlewares/errorHandler';
import { routes } from './routes/routes';
import { Logger } from './utils/logger';
import { Database } from './database';

const app = express();
const PORT = parseInt(process.env.PORT);
const logger = new Logger();

app.use(compression());

app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginOpenerPolicy: false,
	}),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('*.js', (req, res, next) => {
	// req.url = `${req.url}.gz`;
	
	res
		// .set('Content-Encoding', 'gzip')
		.set('Content-Type', 'application/javascript')
		.set('Cache-Control', 'public, max-age=31557600');

	next();
});

app.use(express.static(path.join(__dirname + '/dist')));

app.use(routes);

app.use(errorHandler);

app.get('/*', (_, res) => {
	res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

Database.initialize()
	.then(() => {
		app.listen(PORT).on('listening', () => {
			logger.message(`Servidor iniciado na porta ${PORT}, versão ${version}`, 'start');
		});
	}).catch((err) => {
		logger.message(`Erro ao conectar com o banco de dados: ${err.message}`, 'start');
		process.exit(1);
	});

export { app as server }