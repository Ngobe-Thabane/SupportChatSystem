export interface AdminDashboardStats {
  top_movies: {
    title: string;
    total_bookings: number;
  }[];

  top_showtimes: {
    showtime_id: string;
    movie_title: string;
    show_date: string;      // ISO date string (e.g. "2025-08-01")
    start_time: string;     // ISO time string (e.g. "18:00:00")
    theater_name: string;
    total_bookings: number;
  }[];

  users_per_showtime: {
    showtime_id: string;
    movie_title: string;
    show_date: string;
    start_time: string;
    unique_users: number;
  }[];

  total_active_users: number;

  upcoming_showtimes: {
    showtime_id: string;
    movie_title: string;
    show_date: string;
    start_time: string;
    theater_name: string;
    total_bookings: number;
  }[];

  bookings_per_theater: {
    theater_id: string;
    theater_name: string;
    total_bookings: number;
  }[];
}
