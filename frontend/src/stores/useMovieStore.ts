import { create } from "zustand";

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
