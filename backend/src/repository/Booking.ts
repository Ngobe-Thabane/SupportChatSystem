import db from "../configs/db.ts";

export async function bookSeats(user_id: string, showtime_id: string, seat_numbers: string[]) {

  try {
    await db.query('BEGIN');

    const bookedSeats = [];

    for (const seatNumber of seat_numbers) {
      const seatResult = await db.query(
        `
        SELECT seat_id, is_reserved 
        FROM seats 
        WHERE showtime_id = $1 AND seat_number = $2
        FOR UPDATE;
        `,
        [showtime_id, seatNumber]
      );

      if (seatResult.rowCount === 0) {
        throw new Error(`Seat ${seatNumber} does not exist for this showtime`);
      }

      const seat = seatResult.rows[0];
      if (seat.is_reserved) {
        throw new Error(`Seat ${seatNumber} is already reserved`);
      }

      await db.query(
        `UPDATE seats SET is_reserved = TRUE WHERE seat_id = $1`,
        [seat.seat_id]
      );

      await db.query(
        `
        INSERT INTO bookings (user_id, seat_id)
        VALUES ($1, $2)
        `,
        [user_id, seat.seat_id]
      );

      bookedSeats.push(seatNumber);
    }

    await db.query('COMMIT');
    return { success: true, seats: bookedSeats };

  } catch (error) {
    await db.query('ROLLBACK');
    return { success: false, error: error };
  }
}


export async function getUserDashboard(user_id: string) {
  const query =  `
    SELECT
      sh.showtime_id,
      m.title AS movie_title,
      m.poster_url,
      m.movie_id,
      sh.show_date,
      sh.start_time,
      t.name AS theater_name,
      t.location,
      ARRAY_AGG(s.seat_number ORDER BY s.seat_number) AS seat_numbers,
      MIN(b.booked_at) AS booked_at,
      MAX(b.status) AS status
    FROM bookings b
    LEFT JOIN seats s ON b.seat_id = s.seat_id
    LEFT JOIN showtimes sh ON s.showtime_id = sh.showtime_id
    LEFT JOIN movies m ON sh.movie_id = m.movie_id
    LEFT JOIN theaters t ON sh.theater_id = t.theater_id
    WHERE b.user_id = $1 AND b.status = 'active'
    GROUP BY sh.showtime_id, m.title, m.poster_url, m.movie_id,
             sh.show_date, sh.start_time, t.name, t.location
    ORDER BY sh.show_date, sh.start_time;
  `;
  const result = await db.query(query, [user_id]);
  return result.rows;
}

export async function cancelBooking(user_id: string, booking_id: string) {
  
  try {
    await db.query('BEGIN');

    // 1. Update booking status
    const cancelResult = await db.query(
      `
      UPDATE bookings
      SET status = 'cancelled', canceled_at = NOW()
      WHERE booking_id = $1 AND user_id = $2 AND status = 'active'
      RETURNING seat_id;
      `,
      [booking_id, user_id]
    );

    if (cancelResult.rowCount === 0) {
      throw new Error("Booking not found or already cancelled.");
    }

    const seat_id = cancelResult.rows[0].seat_id;

    // 2. Free the seat
    await db.query(
      `UPDATE seats SET is_reserved = FALSE WHERE seat_id = $1`,
      [seat_id]
    );

    await db.query('COMMIT');
    return { success: true };
  } catch (error) {
    await db.query('ROLLBACK');
    return { success: false, error: error };
  }
}

