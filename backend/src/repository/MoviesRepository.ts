import db from "../configs/db.ts";

export async function addMovie(title: string, description: string, image:string, genre: Array<number>, duration:number ){

  return await db.query('INSERT INTO movies(title, description, image_url, genres, duration_minutes) VALUES($1,$2,$3,$4, $5)', [title,description, image, genre, duration]);
}

export async function getMovies() {
  return await db.query('SELECT * FROM movies', []);
}

export async function deleteMovie(movie_id:number) {
  return await db.query('DELETE FROM movies WHERE movie_id=$1', [movie_id]);
}

export async function getMovie(title:string) {
  return await db.query('SELECT * FROM movies WHERE title=$1', [title]);
}