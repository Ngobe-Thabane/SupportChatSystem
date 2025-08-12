import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { getMovies } from "../lib/GetMovies";

export function MovieGrid(){
    
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        const movie_data = async ()=>{
            const showtime_data = await getMovies();
            setMovies(showtime_data.data);
        }
        movie_data();
    }, []);

    return (
        <div className="grid  mx-3 gap-4 justify-center grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
        {
            movies.map((movie) => (
            <div key={movie.id}>
                <MovieCard movie={movie} />
            </div>
            ))
        }
</div>

    )
}