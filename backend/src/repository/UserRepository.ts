import db from "../configs/db.ts";
import { Register } from "../model/Auth.ts";


export async function findUserByEmail(email:string){
  return db.query('SELECT * FROM users WHERE email=$1', [email]);
}

export async function createUser(userData: Register) {
  return db.query('INSERT INTO users(name, email,password, role) VALUES($1,$2,$3,$4)', [userData.name, userData.email, userData.password, userData.role]);
}