import { Router } from 'express';
import isAdmin from '../middlewares/admin';
import { adminRoutes } from './admin.routes';

const routes = Router();

routes.use('/admin', isAdmin, adminRoutes);

export { routes as apiRoutes };