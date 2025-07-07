import { Request, Response } from "express";
import { addMovie, deleteMovie, getMovie, getMovies } from "../repository/MoviesRepository.ts";


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
  
  const {title, image, description, genres, duration} = req.body;

  if(!title || !image || !description || !genres || !duration){
    return res.status(400).send({message: 'Missing data'})
  }

  const data = await addMovie(title, description, image, genres, duration);

  return res.send({data:data});
}