import type { ShowtTimes } from "./Showtimes.iterface"

export interface Movie{
    id:string,
    title:string,
    poster_url:string,
    description:string,
    genres:Array<number>
    total_bookings?:string,
    release_date: string,
    vote_average:string
}

export interface AdminStats{
    top_movies:Array<Movie>,
    top_showtimes:Array<ShowtTimes>
}