import { create } from "zustand";

export type Cinema = {
  id:string;
  name: string;
  location: string;
};

type Theater = {
  theatersList:Cinema[]|null
  seTheaters: (thaters:Cinema[]) => void;
};

export const useTheaterList = create<Theater>((set)=>({
	theatersList:null,
	seTheaters:(theater:Cinema[]) => set({theatersList:theater})
}))