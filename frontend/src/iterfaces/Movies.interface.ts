import type { ShowtTimes } from "./Showtimes.iterface"

export interface Movie{
    movie_id:string,
    tittle:string,
    poster_url:string,
    description:string,
    genres:Array<string>
    total_bookings:string
}

export interface AdminStats{
    top_movies:Array<Movie>,
    top_showtimes:Array<ShowtTimes>
}