import { config } from "dotenv";
import client from "../configs/redis.ts";
import axios from "axios";

config({path:'../configs/.env'});

export async function getMovieList(list_type:string, page_number:string){

  const list_cached = await client.get(`${list_type}:${page_number}`);

  if(list_cached){ return JSON.parse(list_cached) }

  const movie_list = (await axios.get(`https://api.themoviedb.org/3/movie/${list_type}?language=en-US&page=${page_number}`, {
    headers:{
      'Authorization': `Bearer ${process.env.API_KEY}`,
      'Accept': 'applications/json'
    }
  }));

  await client.set(`${list_type}:${page_number}`, JSON.stringify(movie_list.data.results));

  return movie_list.data.results;
}