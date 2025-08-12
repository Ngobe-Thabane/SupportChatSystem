import express from 'express';
import { addMovieController, adminStatsController, deleteMovieController, getGenresControllers, getMovieController, getMoviesController } from './MovieController.ts';
import { requireAdmin, verifyToken } from '../../middlewares/RoutesMiddleware.ts';

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMoviesController);
movieRoutes.get('/genres', getGenresControllers);
movieRoutes.get('/stats', verifyToken, requireAdmin, adminStatsController);
movieRoutes.post('/movie', verifyToken,requireAdmin ,addMovieController);
movieRoutes.delete('/movie',verifyToken, requireAdmin,deleteMovieController );

export default movieRoutes;

