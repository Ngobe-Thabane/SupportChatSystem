import express from 'express';
import { verifyToken } from '../middlewares/RoutesMiddleware';
import { bookingController, cancelBookingController, getUserBooking } from './BookingController';


const userBooking = express.Router();

userBooking.use(verifyToken);

userBooking.post('/booking', bookingController);
userBooking.put('/cancelBooking', cancelBookingController);
userBooking.get('/bookings', getUserBooking);

export default userBooking;