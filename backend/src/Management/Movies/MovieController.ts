import { Request, Response } from "express";
import { addMovie, deleteMovie, getMovie, getMovies, addMovieGenres, getGenres } from "../../repository/MoviesRepository.ts";
import { getAdminDashboardStats } from "../../repository/AdminDashBoard.ts";
import { addShowTime } from "../../repository/ShowtimesRepository.ts";


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
  
  const {moveiShowTime, scheduleShowTimes} = req.body;

  if(! moveiShowTime.title || ! moveiShowTime.poster_url || !moveiShowTime.description || !moveiShowTime.genres ){
    return res.status(400).send({message: 'Missing data'})
  }

  const movie_id =  await addMovie( moveiShowTime.title, moveiShowTime.description, moveiShowTime.poster_url);
  
  addMovieGenres( moveiShowTime.genres, movie_id.rows[0].movie_id);

  if(!scheduleShowTimes.theater_id || !scheduleShowTimes.time || scheduleShowTimes.release_date){
    addShowTime(movie_id.rows[0].movie_id, scheduleShowTimes.theater_id, scheduleShowTimes.release_date, scheduleShowTimes.time);
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