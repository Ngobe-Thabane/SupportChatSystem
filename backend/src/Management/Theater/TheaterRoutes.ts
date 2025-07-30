import express from 'express';
import { requireAdmin, verifyToken } from '../../middlewares/RoutesMiddleware';
import { AddTheaterController, deleteTheaterController, getTheaterController, getTheaterListController, updateTheaterDetails } from './TheaterController';

const theaterRoutes = express.Router();
theaterRoutes.use(verifyToken)
theaterRoutes.post('/add-theater', requireAdmin, AddTheaterController);
theaterRoutes.get('/theaters', getTheaterListController);
theaterRoutes.delete('/theater/:id', requireAdmin, deleteTheaterController);
theaterRoutes.get('/theater/:id', getTheaterController);
theaterRoutes.put('/theater/:id', requireAdmin, updateTheaterDetails);

export default theaterRoutes;
