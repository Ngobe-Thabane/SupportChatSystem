import express from 'express';
import { requireAdmin, verifyToken } from '../../middlewares/RoutesMiddleware';
import { AddTheaterController, deleteTheaterController, getTheaterController, getTheaterListController, updateTheaterDetails } from './TheaterController';

const theaterRoutes = express.Router();
theaterRoutes.use(verifyToken)
theaterRoutes.post('/add-theater', requireAdmin, AddTheaterController);
theaterRoutes.get('/theaters', getTheaterListController);
theaterRoutes.delete('/theater/', requireAdmin, deleteTheaterController);
theaterRoutes.get('/theater/', getTheaterController);
theaterRoutes.put('/theater/', requireAdmin, updateTheaterDetails);

export default theaterRoutes;
