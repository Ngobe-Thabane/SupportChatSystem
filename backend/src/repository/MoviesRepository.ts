import db from "../configs/db.ts";

export async function addMovie(title: string, description: string, poster_url:string){

  return await db.query('INSERT INTO movies(title, description, poster_url) VALUES($1,$2,$3) RETURNING movie_id', [title,description, poster_url]);
}

export async function getMovies() {
  return await db.query(`SELECT m.movie_id, m.title, m.poster_url, m.description, ARRAY_AGG(g.name ORDER BY g.name) AS genres FROM movies m LEFT JOIN movie_genres mg ON m.movie_id=mg.movie_id LEFT JOIN genres g ON mg.genre_id=g.genre_id GROUP BY m.movie_id`, []);
}

export async function deleteMovie(movie_id:string) {
  return await db.query('DELETE FROM movies WHERE movie_id=$1', [movie_id]);
}

export async function getMovie(title:string) {
  return await db.query(`SELECT m.movie_id, m.title, m.poster_url, m.description, ARRAY_AGG(g.name ORDER BY g.name) AS genres FROM movies m LEFT JOIN movie_genres mg ON m.movie_id=mg.movie_id LEFT JOIN genres g ON mg.genre_id=g.genre_id WHERE m.movie_id=${title} GROUP BY m.movie_id`, [], [title]);
}

export async function addMovieGenres(genres:Array<numbers>, movie_id:string){
  genres.forEach(async (genre)=>{
    await db.query('INSERT INTO movie_genres(movie_id, genre_id) VALUES($1,$2)', [movie_id, genre]);
  });
}
