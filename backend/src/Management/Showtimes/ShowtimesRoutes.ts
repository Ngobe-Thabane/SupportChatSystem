import express from 'express'
import { addShowtimeController, deleteShowTimeController, getAllShowTimesController, getShowTimesController, getTheaterShowTimesController } from './ShowtimesController';
import { requireAdmin, verifyToken } from '../../middlewares/RoutesMiddleware';


const showTimes = express.Router();

showTimes.use(verifyToken)

showTimes.post('/showTimes', requireAdmin, addShowtimeController);
showTimes.delete('/showTime/', requireAdmin,  deleteShowTimeController)
showTimes.get('/showTimes/:showtime_id', getShowTimesController);
showTimes.get('/allShowTimes', getAllShowTimesController);
showTimes.get('/theaterShowTimes', getTheaterShowTimesController);
export default showTimes;

