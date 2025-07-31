
import axios from "axios";
import type { Auth } from "../interfaces/Auth.Interface";

export async function loginUser(formData: Auth){

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

export async function registerUser(formData: Auth){
  
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