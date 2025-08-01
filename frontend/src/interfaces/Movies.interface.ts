import type { ShowtTimes } from "./Showtimes.iterface"

export interface Movie{
    movie_id?:string,
    title:string,
    poster_url:string,
    description:string,
    genres?:Array<number>
    total_bookings?:string,
    release_date: string
}

export interface AdminStats{
    top_movies:Array<Movie>,
    top_showtimes:Array<ShowtTimes>
}