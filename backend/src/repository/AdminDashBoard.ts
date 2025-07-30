import db from "../configs/db.ts";
import { AdminDashboardStats } from "./AdminDashBoard.types.ts";

export async function getAdminDashboardStats() {
  const dashboard:AdminDashboardStats = {
    top_movies: [],
    top_showtimes: [],
    users_per_showtime: [],
    total_active_users: 0,
    upcoming_showtimes: [],
    bookings_per_theater: []
  };

  // 1. Most Booked Movies
  const topMovies = await db.query(`
    SELECT m.title, COUNT(b.booking_id) AS total_bookings
    FROM bookings b
    JOIN seats s ON b.seat_id = s.seat_id
    JOIN showtimes st ON s.showtime_id = st.showtime_id
    JOIN movies m ON st.movie_id = m.movie_id
    WHERE b.status = 'active'
    GROUP BY m.title
    ORDER BY total_bookings DESC
    LIMIT 10;
  `);

  // 2. Most Booked Showtimes
  const topShowtimes = await db.query(`
    SELECT
      st.showtime_id,
      m.title AS movie_title,
      st.show_date,
      st.start_time,
      t.name AS theater_name,
      COUNT(b.booking_id) AS total_bookings
    FROM bookings b
    JOIN seats s ON b.seat_id = s.seat_id
    JOIN showtimes st ON s.showtime_id = st.showtime_id
    JOIN movies m ON st.movie_id = m.movie_id
    JOIN theaters t ON st.theater_id = t.theater_id
    WHERE b.status = 'active'
    GROUP BY st.showtime_id, m.title, st.show_date, st.start_time, t.name
    ORDER BY total_bookings DESC
    LIMIT 10;
  `);

  // 3. Number of Users per Showtime
  const userPerShow = await db.query(`
    SELECT
      st.showtime_id,
      m.title AS movie_title,
      st.show_date,
      st.start_time,
      COUNT(DISTINCT b.user_id) AS unique_users
    FROM bookings b
    JOIN seats s ON b.seat_id = s.seat_id
    JOIN showtimes st ON s.showtime_id = st.showtime_id
    JOIN movies m ON st.movie_id = m.movie_id
    WHERE b.status = 'active'
    GROUP BY st.showtime_id, m.title, st.show_date, st.start_time
    ORDER BY st.show_date DESC;
  `);

  // 4. Total Active Users
  const activeUsers = await db.query(`
    SELECT COUNT(DISTINCT user_id) AS total_active_users
    FROM bookings
    WHERE status = 'active';
  `);

  // 5. Upcoming Showtimes with Booking Count
  const upcomingShows = await db.query(`
    SELECT
      st.showtime_id,
      m.title AS movie_title,
      st.show_date,
      st.start_time,
      t.name AS theater_name,
      COUNT(b.booking_id) AS total_bookings
    FROM showtimes st
    LEFT JOIN seats s ON st.showtime_id = s.showtime_id
    LEFT JOIN bookings b ON s.seat_id = b.seat_id AND b.status = 'active'
    JOIN movies m ON st.movie_id = m.movie_id
    JOIN theaters t ON st.theater_id = t.theater_id
    WHERE st.show_date >= CURRENT_DATE
    GROUP BY st.showtime_id, m.title, st.show_date, st.start_time, t.name
    ORDER BY st.show_date, st.start_time;
  `);

  // 6. Bookings Per Theater
  const theaterStats = await db.query(`
    SELECT
      t.theater_id,
      t.name AS theater_name,
      COUNT(b.booking_id) AS total_bookings
    FROM bookings b
    JOIN seats s ON b.seat_id = s.seat_id
    JOIN showtimes st ON s.showtime_id = st.showtime_id
    JOIN theaters t ON st.theater_id = t.theater_id
    WHERE b.status = 'active'
    GROUP BY t.theater_id, t.name
    ORDER BY total_bookings DESC;
  `);

  // Combine all into a single object
  dashboard.top_movies = topMovies.rows;
  dashboard.top_showtimes = topShowtimes.rows;
  dashboard.users_per_showtime = userPerShow.rows;
  dashboard.total_active_users = Number(activeUsers.rows[0].total_active_users);
  dashboard.upcoming_showtimes = upcomingShows.rows;
  dashboard.bookings_per_theater = theaterStats.rows;

  return dashboard;
}
