import { Request, Response } from "express";
import { bookSeats, cancelBooking, getUserDashboard } from "../repository/Booking";


export async function bookingController(req:Request, res:Response){
  const {showTime_id, seat_numbers} = req.body;
  if(!showTime_id || !seat_numbers) return res.status(400).send({message:'All fields must be field'});
  
  const bookedSeat = await bookSeats(req.user?.id as string, showTime_id, seat_numbers);

  return res.status(201).send(bookedSeat);
}

export async function cancelBookingController(req:Request, res:Response){
  const {booking_id} = req.body;

  if(!booking_id) return res.status(400).send({message:"Booking id is required"});

  const bookingCanceled = cancelBooking(req.user?.id as string, booking_id);

  return res.status(200).send(bookingCanceled);
}

export async function getUserBooking(req:Request, res:Response) {
  console.log(req.user?.id);
  const userBookings = await getUserDashboard(req.user?.id as string);
  return res.status(200).send(userBookings);
  
}