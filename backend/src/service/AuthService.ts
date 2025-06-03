import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginResponse, Register, RegisterResponse } from "../model/Auth.ts";
import { createUser, findUserByEmail } from "../repository/UserRepository.ts";
import { config } from 'dotenv';

config({path: 'src/configs/.env', encoding:'utf8'});

export async function registerUser(userData: Register): Promise<RegisterResponse>{

  try{
    const user = await findUserByEmail(userData.email);
  
    if(user.rows.length !== 0){
      return {success: false, error: "user_exists"};
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);
    await createUser({...userData, password: passwordHash});

    return { success: true}

  }catch(err: unknown){
    return {success:false, error: 'internal_error'};
  }
  
}

export async function loginUser(email:string, password:string): Promise<LoginResponse>{
  
  try{

    const user = await  findUserByEmail(email);

    if(user.rows.length === 0){
      return { success: false, error: "user_not_found" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);

    if(!isPasswordCorrect){
      return { success: false, error: 'invalid_password' }
    }
    const userPayload = {name: user.rows[0].name, id: user.rows[0].id, email:user.rows[0].email, role:user.rows[0].role};

    const token = jwt.sign( userPayload, process.env.JWT_SECRETE as string,{ expiresIn:'1h'});

    return { success: true, token: token }
  }

  catch(err){
    return { success: false, error: 'internal_error' }
  }

}