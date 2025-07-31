import { Request, Response } from "express";
import { loginUser, registerUser } from "./AuthService.ts";
import { Register } from "./Auth.types.ts";

export async function loginController(req : Request, res: Response){
  
  const {email, password} = req.body;
  
  if(!email || !password){
    return res.status(400).send({message:"All fields must be field"});
  }

  const result =  await loginUser(email, password);

  if(!result.success){

    switch(result.error){
      case "user_not_found":
      case "invalid_password":
        return res.status(401).send({message: 'Invalid email or password'});
      case "internal_error":
        return res.status(500).send({message: 'Server error'});
    }
  }

  return res.status(200).send({token: result.token, user:result.user});

}

export async function registerController(req: Request, res: Response){

  const {email, username, password} = req.body;

  if(!email || !username || !password ){
    return res.status(400).send({message: "All fields must b field"});
  }

  const result = await registerUser(email, username, password);

  if(!result.success){
    switch(result.error){
      case "user_exists":
        return res.status(400).send({message:"Registration failed"});
      case "internal_error":
        return res.status(500).send({message: 'Server error'});
    }
  }

  return res.status(201).send({message:"user registered"});
}
