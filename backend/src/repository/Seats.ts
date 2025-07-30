import db from "../configs/db.ts";

export async function generateSeatsForShowtime(showtime_id: string) {
  const rows = "ABCDEFGHIJ".split(""); // rows A–J
  const seatsPerRow = 10;

  const values = [];
  const placeholders = [];

  let i = 1;
  for (const row of rows) {
    for (let num = 1; num <= seatsPerRow; num++) {
      const seatNumber = `${row}${num}`; 
      values.push(showtime_id, seatNumber);
      placeholders.push(`($${i++}, $${i++})`);
    }
  }

  const query = `
    INSERT INTO seats (showtime_id, seat_number)
    VALUES ${placeholders.join(", ")};
  `;

  await db.query(query, values);
}
