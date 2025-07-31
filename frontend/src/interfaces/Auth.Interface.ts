
export interface Auth {
  email:string,
  password:string,
  role:string,
  name:string,
  username:string,
}


export interface AuthResponse{
  token:string,
  user:Auth
}

