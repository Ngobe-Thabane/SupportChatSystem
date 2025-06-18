import express from 'express';
import { addMovieController, getMovieController, getMoviesController } from './MovieController.ts';
import { requireAdmin, verifyToken } from '../middlewares/RoutesMiddleware.ts';

const movieRoutes = express.Router();

movieRoutes.use(verifyToken);
movieRoutes.get('/movies', getMoviesController);
movieRoutes.get('/movie/:id', getMovieController);

movieRoutes.post('/movie',requireAdmin ,addMovieController);

export default movieRoutes;

