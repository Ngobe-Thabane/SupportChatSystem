
export const generateSeats = (takenIndices: number[] = []) => {
  const rows = 10; // A-J
  const cols = 10;
  const seats: { id: string; taken: boolean }[] = [];

  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r); // A-J
    for (let c = 1; c <= cols; c++) {
      const seatId = `${rowLetter}${c}`;
      const index = r * cols + (c - 1);
      seats.push({ id: seatId, taken: takenIndices.includes(index) });
    }
  }

  return seats;
};
