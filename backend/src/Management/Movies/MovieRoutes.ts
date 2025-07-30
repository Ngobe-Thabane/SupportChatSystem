import express from 'express';
import { addMovieController, deleteMovieController, getMovieController, getMoviesController } from './MovieController.ts';
import { requireAdmin, verifyToken } from '../../middlewares/RoutesMiddleware.ts';
import { getAdminDashboardStats } from '../../repository/AdminDashBoard.ts';

const movieRoutes = express.Router();

movieRoutes.use(verifyToken);
movieRoutes.get('/movies', getMoviesController);
movieRoutes.get('/movie/:id', getMovieController);
movieRoutes.get('/stats', requireAdmin, getAdminDashboardStats);
movieRoutes.post('/movie',requireAdmin ,addMovieController);
movieRoutes.delete('/movie', requireAdmin,deleteMovieController )

export default movieRoutes;

