import { create } from "zustand";
import type { Movie } from "../interfaces/Movies.interface";

export type Cinema = {
  theater_id:string;
  name: string;
  location: string;
  time ?: string
};
export type Genres = {
  genre_id:number,
  name:string
}

export type MoviesList ={
  total_pages : number,
  results : Array<Movie>,
  setResults: (results:Array<Movie>) => void,
  setTotalPages : (pages:number) => void
}

type Genre ={
  genreList :Genres[],
  setGenres: (genres:Genres[]) => void
}

type Theater = {
  theatersList:Cinema[]|null
  seTheaters: (thaters:Cinema[]) => void;
};

export const useTheaterList = create<Theater>((set)=>({
	theatersList:null,
	seTheaters:(theater:Cinema[]) => set({theatersList:theater})
}))

export const useGenres = create<Genre>((set)=>({
  genreList: [],
  setGenres: (genres:Genres[]) => set({genreList:genres})
}));


export const useMovieList = create<MoviesList>((set)=>({
  total_pages: 8,
  results: [],
  setResults : (results:Array<Movie>) => set(({results:results})),
  setTotalPages : (pages:number) => set(({total_pages:pages}))
}))