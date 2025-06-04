import type { Register, Login } from "../interfaces/Interface";
import axios from "axios";

export async function login(formData: Login){

  const result = await axios({
    method: 'post',
    url:'http://localhost:5000/api/auth/login',
    headers:{
      "Content-Type":"application/json"
    },
    data:formData
  })
  
  return result;
}

export async function register(formData: Register){
  
  const result = await axios({
    method: 'post',
    url:'http://localhost:5000/api/auth/register',
    headers:{
      "Content-Type":"application/json"
    },
    data:formData
  })
  
  return result;
}