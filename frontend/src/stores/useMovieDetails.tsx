
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getMovieDetails } from "../lib/GetMovies";

const API_KEY = "your_tmdb_api_key";
const BASE_URL = "http://localhost:5000";

export type MovieDetailsResponse = {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  runtime: number;
  release_date: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; logo_path: string | null; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; job: string; name: string; profile_path: string | null }[];
  };
  videos: {
    results: { id: string; key: string; site: string; type: string; name: string }[];
  };
};

export function useMovieDetails(movieId: number) {
  return getMovieDetails(movieId);
}
