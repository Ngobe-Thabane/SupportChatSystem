import db from "../configs/db.ts";
 
export async function addShowTime(movie_id: string, theater_id: string, show_date: Date, start_time: number) {
  const query = `
    INSERT INTO showtimes (movie_id, theater_id, show_date, start_time)
    VALUES ($1, $2, $3, to_timestamp($4)::time)
    RETURNING showtime_id;
  `;
  const values = [movie_id, theater_id, show_date, start_time];
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function deleteShowTime(showtime_id: string) {
  return db.query('DELETE FROM showtimes WHERE showtime_id = $1', [showtime_id]);
}

export async function getMovieShowTime(movie_id: string) {
  const query = `
SELECT 
  s.showtime_id,
  s.show_date,
  s.start_time,
  t.name AS theater_name,
  t.location,
  ARRAY_AGG(JSON_BUILD_OBJECT(
    'seat_number', e.seat_number,
    'is_reserved', e.is_reserved
  )) AS seats 
FROM showtimes s
LEFT JOIN theaters t ON s.theater_id = t.theater_id
LEFT JOIN seats e ON e.showtime_id = e.showtime_id
WHERE s.movie_id = $1
GROUP BY 
  s.showtime_id,
  s.show_date,
  s.start_time,
  t.name,
  t.location
ORDER BY s.show_date, s.start_time;
`;
  const result = await db.query(query, [movie_id]);
  return result.rows;
}

export async function getShowTimes() {
  const query = `SELECT 
  s.showtime_id,
  s.show_date,
  s.start_time,
  m.title AS movie_title,
  m.poster_url,
  t.name AS theater_name,
  t.location,
  ARRAY_AGG(JSON_BUILD_OBJECT(
    'seat_number', e.seat_number,
    'is_reserved', e.is_reserved
  )) AS seats 
  FROM showtimes s
  LEFT JOIN movies m ON s.movie_id = m.movie_id
  LEFT JOIN seats e ON s.showtime_id = e.showtime_id
  LEFT JOIN theaters t ON s.theater_id = t.theater_id
  GROUP BY 
    s.showtime_id,
    s.show_date,
    s.start_time,
    m.title,
    m.poster_url,
    t.name,
    t.location
  ORDER BY s.show_date, s.start_time;`;
  const result = await db.query(query);
  return result.rows;
}

export async function getTheaterShowTimes(theater_id: string) {
  const query = `
    SELECT 
      s.showtime_id,
      s.show_date,
      s.start_time,
    FROM showtimes s
    JOIN movies m ON s.movie_id = m.movie_id
    WHERE s.theater_id = $1
    ORDER BY s.show_date, s.start_time;
  `;
  const result = await db.query(query, [theater_id]);
  return result.rows;
}

