import express from 'express';
import { requireAdmin, verifyToken } from '../../middlewares/RoutesMiddleware';
import { AddTheaterController, deleteTheaterController, getTheaterController, getTheaterListController, updateTheaterDetails } from './TheaterController';

const theaterRoutes = express.Router();
theaterRoutes.post('/add-theater', verifyToken,requireAdmin, AddTheaterController);
theaterRoutes.get('/theaters', getTheaterListController);
theaterRoutes.delete('/theater/',verifyToken, requireAdmin, deleteTheaterController);
theaterRoutes.get('/theater/', getTheaterController);
theaterRoutes.put('/theater/',verifyToken, requireAdmin, updateTheaterDetails);

export default theaterRoutes;
