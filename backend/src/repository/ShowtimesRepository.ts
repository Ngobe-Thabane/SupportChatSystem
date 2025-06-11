import db from "../configs/db.ts";


async function addShowTime( movie_id:string, theater_id:string, show_date:Date, start_time:number ) {
  
}

async function deleteShowTime(showtime_id:string) {
  return db.query('DELETE FROM showtime WHERE showtime_id=$1', [showtime_id]);
}

async function getMovieShowTime( movie_id:string ) {
  
}


async function getShowTimes() {
  
}


async function getTheaterShowTimes( theater_id:string ) {
  
}