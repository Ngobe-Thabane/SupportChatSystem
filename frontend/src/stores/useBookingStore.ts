import { create } from "zustand"

type Booking = {
  seatsList: string[],
  showtime_id : string,
  setShowTime : (id:string) => void,
  addSeat: (seat: string) => void,
  removeSeat: (seat: string) => void,
  clearSeats: () => void,
}

export const useSeats = create<Booking>((set) => ({
  seatsList: [],
  showtime_id :"",
  setShowTime : (id:string) =>set(({showtime_id:id})),
  
  addSeat: (seat: string) =>
    set((state) => {
      if (state.seatsList.includes(seat)) return state // prevent duplicates
      return {
        seatsList: [...state.seatsList, seat],
      }
    }),

  removeSeat: (seat: string) =>
    set((state) => ({
      seatsList: state.seatsList.filter((s) => s !== seat),
    })),

  clearSeats: () =>
    set(() => ({
      seatsList: [],
    })),
}))
