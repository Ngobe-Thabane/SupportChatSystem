import express from 'express';
import { addMovieController, getMovieController, getMoviesController } from './MovieController.ts';

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMoviesController);
movieRoutes.get('/movie/:title', getMovieController);

movieRoutes.post('/movie', addMovieController);

export default movieRoutes;

