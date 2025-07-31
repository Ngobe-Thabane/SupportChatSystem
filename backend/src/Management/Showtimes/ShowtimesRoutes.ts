import express from 'express'
import { addShowtimeController, deleteShowTimeController, getAllShowTimesController, getMovieShowTimesController, getTheaterShowTimesController } from './ShowtimesController';
import { requireAdmin, verifyToken } from '../../middlewares/RoutesMiddleware';


const showTimes = express.Router();


showTimes.post('/showTimes', verifyToken ,requireAdmin, addShowtimeController);
showTimes.delete('/showTime',verifyToken, requireAdmin,  deleteShowTimeController)
showTimes.get('/movieShowTime', getMovieShowTimesController);
showTimes.get('/allShowTimes', getAllShowTimesController);
showTimes.get('/theaterShowTimes', getTheaterShowTimesController);
export default showTimes;

