import { Request, Response } from "express";
import { getMoviedtails, getMovieList } from "./MovieDbService.ts";



export async function getNowPlayingMovies(req:Request, res:Response){

  try{

    const { page_number } = req.params;
    const now_playing_list = await getMovieList('now_playing', page_number);
    return res.status(200).send(now_playing_list);

  }catch(err){
    return res.status(500).send({message:'Internal Server Error'});
  }

}


export async function getPopularMovies(req:Request, res:Response) {

  try{

    const { page_number } = req.params;
    const now_playing_list = await getMovieList('popular', page_number);
    return res.status(200).send(now_playing_list);

  }catch(err){
    return res.status(500).send({message:'Internal Server Error'});
  }

}


export async function getTopRatedMovies(req:Request, res:Response) {

  try{

    const { page_number } = req.params;
    const now_playing_list = await getMovieList('top_rated', page_number);
    return res.status(200).send(now_playing_list);

  }catch(err){
    return res.status(500).send({message:'Internal Server Error'});
  }

}


export async function getUpcomingMovies(req:Request, res:Response) {

  try{

    const { page_number } = req.params;
    const now_playing_list = await getMovieList('upcoming', page_number);
    return res.status(200).send(now_playing_list);

  }catch(err){
    return res.status(500).send({message:'Internal Server Error'});
  }

}

export async function getMoviedetailsController(req:Request, res:Response) {
  try{
    const {movie_id} = req.params;
    if(!movie_id) res.status(400).send({message:'Movie id is required'});

    const movie_details = await getMoviedtails(movie_id);
    return res.status(200).send(movie_details);

  }catch(err:any){
    return res.status(500).send({message:err.message})
  }
  
}