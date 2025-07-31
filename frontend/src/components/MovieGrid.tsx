import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { getMovies } from "../lib/GetMovies";

export function MovieGrid(){
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        const movie_data = async ()=>{
            const showtime_data = await getMovies();
            setMovies(showtime_data.data);
        }
        movie_data();
    }, [])
    return (
        <div className="px-6 py-12 bg-base-100">
             {/* <h2 className="text-2xl font-bold mb-8 text-center text-primary">
                Now Showing
            </h2> */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    movies.map((movie)=>{
                        return <MovieCard movie={movie}/>
                    })
                }
            </div>
        </div>
    )
}