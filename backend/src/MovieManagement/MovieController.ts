import { Request, Response } from "express";
import { addMovie, deleteMovie, getMovie, getMovies, addMovieGenres } from "../repository/MoviesRepository.ts";


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

export async function deleteMovieController(req:Request, res:Response) {
  const { id } = req.body
  if(!id) return res.status(400).send({message:'Bad Request'});
  await deleteMovie(id);  
  return res.status(200).send({message:'Movie deleted'});
}

export async function addMovieController(req:Request, res:Response){
  
  const {title, poster_url, description, genres} = req.body;

  if(!title || !poster_url || !description || !genres ){
    return res.status(400).send({message: 'Missing data'})
  }

  const movie_id =  await addMovie(title, description, poster_url);
  console.log(movie_id);
  
  addMovieGenres(genres, movie_id.rows[0].movie_id);
  return res.status(201).send({message:"MovieAdded"});
}
