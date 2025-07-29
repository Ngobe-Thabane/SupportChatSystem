import db from "../configs/db.ts";
import { Register } from "../Auth/Auth.types.ts";

export async function findUserByEmail(email:string){
  return db.query('SELECT * FROM users WHERE email=$1', [email]);
}

export async function createUser(userData: Register) {
  return db.query('INSERT INTO users(username, email,password) VALUES($1,$2,$3)', [userData.username, userData.email, userData.password]);
 }

export async function deleteUser(user_id:string) {
  return db.query('DELETE FROM users WHERE user_id=$1', [user_id]);
  
}
