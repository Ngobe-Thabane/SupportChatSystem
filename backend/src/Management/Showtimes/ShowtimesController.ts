import { Request, Response } from "express";
import { addShowTime, deleteShowTime, getMovieShowTime, getShowTimes, getTheaterShowTimes } from "../../repository/ShowtimesRepository";
import { generateSeatsForShowtime } from "../../repository/Seats";


export async function addShowtimeController(req:Request, res:Response){

  try{

    const {movie_id, theater_id, show_date, start_time} = req.body;
  
    if(!movie_id || !theater_id || !show_date || !start_time){
      return res.status(400).send({message:"Missing fields"});
    }
    
    const showTime = await addShowTime(movie_id, theater_id, show_date, start_time);
    await generateSeatsForShowtime(showTime.showtime_id);
  
    return res.status(201).send({showTime:showTime.showtime_id})
  }catch(err:unknown){
    console.log(err.stack);
    return res.status(500).send({message:err.message});
  }

}

export async function getMovieShowTimesController(req:Request, res:Response){
  const {movie_id} = req.params;
  if(!movie_id) return res.status(400).send({message:'Show time id is required'});
  
  const showTime = await getMovieShowTime(movie_id);
  return res.status(200).send({movieTime:showTime});
  
}

export async function getAllShowTimesController(req:Request, res:Response) {
  const showTimes = await getShowTimes();
  return res.status(200).send({showTimes:showTimes});
}

export async function deleteShowTimeController(req:Request, res:Response) {
  const {showTime_id} = req.body;

  if(!showTime_id){
    return res.status(400).send({message:'showtime id is required'})
  }

  await deleteShowTime(showTime_id);
  return res.status(200).send({message:'Showtime deleted'});
  
}

export async function getTheaterShowTimesController(req:Request, res:Response) {
  const {theater_id} = req.body;

  if(!theater_id) return res.send({message:'Theater Id is required'});
  const theaterShowTimes = await getTheaterShowTimes(theater_id);

  return res.status(200).send({theaterShowTimes:theaterShowTimes});
}