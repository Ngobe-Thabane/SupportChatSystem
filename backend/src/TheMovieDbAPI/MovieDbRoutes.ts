import express from 'express';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from './MovieDbControllers.ts';

const movieDbRoutes = express.Router();
movieDbRoutes.use(express.json());
movieDbRoutes.get('/now_playing/:page_number', getNowPlayingMovies);
movieDbRoutes.get('/top_rated/:page_number', getTopRatedMovies);
movieDbRoutes.get('/upcoming/:page_number', getUpcomingMovies);
movieDbRoutes.get('/popular/:page_number', getPopularMovies);

export default movieDbRoutes;
