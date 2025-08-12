
import { useLocation } from "react-router";
import { useMovieDetails, type MovieDetailsResponse } from "../stores/useMovieDetails";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieDeatil";
import CastCarousel from "./CastCarousel";

export default function MovieDetails() {
  const location = useLocation();
  const [data, setData] = useState<MovieDetailsResponse>();
  const [trailer, setrailer] = useState();

  useEffect(()=>{
    const movieDetails = async ()=>{
      
      const { data} = await useMovieDetails(location.state.id);
      const trailer = data.videos.results.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );
      setrailer(trailer);
      setData(data)
    }
    movieDetails();
  }, [ ])

  return (
    <>
      <div className="bg-base-100 min-h-screen ">
        <div
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${location.state.poster_url})` }}
        >
    <div className="absolute inset-0 bg-black/60 " />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-32 z-10">
          <MovieCard movie={location.state}  data={data as MovieDetailsResponse}/>
        </div>
      
      </div>
    <CastCarousel data={data} />
    </>
  );
}
