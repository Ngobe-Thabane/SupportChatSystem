import express from 'express';
import authRouter from './Auth/AuthRoutes.ts';
import cors from 'cors';
import movieRoutes from './MovieManagement/MovieRoutes.ts';
import movieDbRoutes from './TheMovieDbAPI/MovieDbRoutes.ts';
import theaterRoutes from './TheaterManagement/TheaterRoutes.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter);
app.use(movieRoutes);
app.use(movieDbRoutes);
app.use(theaterRoutes);

app.listen(5000, ()=>{
  console.log('Server is running on Port 5000');
})