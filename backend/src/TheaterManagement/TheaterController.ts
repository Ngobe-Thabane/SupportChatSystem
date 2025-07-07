import { Request, Response } from "express";
import { addTheater, getExactTheater, getTheaters } from "../repository/TheaterRepository";

export async function AddTheaterController(req:Request, res:Response){

  const {name, location} = req.body;

  if(!name || !location){
    return res.status(400).send({message:'Missing data'});
  }

  try{
    const isTheaterExists = await getExactTheater(name, location);

    if(isTheaterExists.rows.length > 1){
      return res.status(400).send({message:'Theater already exists'});
    }
    const  theater = await addTheater(name, location);
    return res.status(201).send({message:'Theater successfully added'})

  }catch(err){
    return res.status(500).send({message:'theater already exist'})
  }

}


export async function getTheaterListController(req:Request, res:Response){

  try{
    const theaters = await getTheaters();
    return res.status(200).send({theaters:theaters});
  }
  catch(err){
    return res.send({message:'Internal server error'});
  }
}

export function deleteTheaterController(req:Request, res:Response){

}

export function getTheaterController(req:Request, res:Response){

}


export function updateTheaterDetails(req:Request, res:Response){

}