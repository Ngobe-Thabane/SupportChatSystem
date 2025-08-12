import { Request, Response } from "express";
import { addMovie, deleteMovie, getMovie, getMovies, addMovieGenres, getGenres } from "../../repository/MoviesRepository.ts";
import { getAdminDashboardStats } from "../../repository/AdminDashBoard.ts";
import { addShowTime } from "../../repository/ShowtimesRepository.ts";
import { generateSeatsForShowtime } from "../../repository/Seats.ts";


export async function getMoviesController(req: Request, res:Response){
  const movies = await getMovies();
  return res.status(200).send(movies.rows);
}

export async function getMovieController(req:Request, res:Response){

  const {title} = req.params;

  if(!title){
    return res.status(400).send({message: "Title must be provided"});
  }
  const movie = await getMovie(title);
  return res.status(200).send(movie.rows);
}

export async function getGenresControllers(req:Request, res:Response) {
  const genres = await getGenres();
  return res.status(200).send(genres.rows);
}


export async function deleteMovieController(req:Request, res:Response) {
  const { id } = req.body
  if(!id) return res.status(400).send({message:'Bad Request'});
  await deleteMovie(id);  
  return res.status(200).send({message:'Movie deleted'});
}

export async function addMovieController(req:Request, res:Response){
  
  const {movie, showtimes} = req.body;
  const {title, poster_url, description, genres} = movie;
  
  if(! title || ! poster_url || !description || !genres ){
    return res.status(400).send({message: 'Missing data'})
  }

  const movie_id =  await addMovie( title, description, poster_url);
  
  addMovieGenres( genres, movie_id.rows[0].movie_id);

  if(showtimes.length > 0){
    showtimes.forEach(async(showtime:any)=>{
      
      const now = new Date();
      const [hours, minutes] = showtime.time.split(":").map(Number);
      now.setHours(hours);
      now.setMinutes(minutes);
      now.setSeconds(0);
      now.setMilliseconds(0);
      const timestamp = now.getTime();

      const showTime = await addShowTime(movie_id.rows[0].movie_id, showtime.theater_id, showtime.release_date, timestamp);
      await generateSeatsForShowtime(showTime.showtime_id);
    })
  }else{
    deleteMovie(movie_id.rows[0].movie_id);
  }

  return res.status(201).send({message:"MovieAdded", movie_id:movie_id.rows[0].movie_id});
}


export async function adminStatsController(req:Request, res:Response) {

  try{
    const stats = await getAdminDashboardStats();
    return res.status(200).send(stats);

  }catch(err:unknown){
    return res.status(500).send({message:err.message})
  }
  
}
