export interface Seats{
    seat_id:string,
    seat_number:string,
    isRerseved:string
}

export interface ShowtTimes{
    showtime_id :string,
    show_date:string,
    start_time:string,
    movie_title:string,
    poster_url:string,
    theater_name:string,
    location:string,
    total_bookings:string,
    seats:Array<Seats>
}