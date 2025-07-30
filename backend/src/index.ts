import express from 'express';
import authRouter from './Auth/AuthRoutes.ts';
import cors from 'cors';
import movieRoutes from './Management/Movies/MovieRoutes.ts';
import movieDbRoutes from './TheMovieDbAPI/MovieDbRoutes.ts';
import theaterRoutes from './Management/Theater/TheaterRoutes.ts';
import showTimes from './Management/Showtimes/ShowtimesRoutes.ts';
import userBooking from './Reservation/BookingRoutes.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter);
app.use(movieRoutes);
app.use(movieDbRoutes);
app.use(theaterRoutes);
app.use(showTimes);
app.use(userBooking);

app.listen(5000, ()=>{
  console.log('Server is running on Port 5000');
})