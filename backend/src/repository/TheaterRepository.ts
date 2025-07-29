import db from "../configs/db.ts";

export async function addTheater(name:string, location:string){
  return await db.query('INSERT INTO TABLE theaters(name, location) VALUES($1,$2)', [name, location]);
}

export async function getExactTheater(name:string, location:string) {
  return await db.query('SELECT * FROM theaters WHERE name=$1 AND location=$2', [name, location]);
}

export async function getTheater(name:string) {
  return await db.query('SELECT * FROM theaters WHERE name=$1 AND location=$2', [name, location]);
}

export async function deleteTheater(theater_id:string) {
  return db.query('DELETE FROM theaters WHERE theater_id=$1', [theater_id]);
}
export async function getTheaters() {
  return await db.query('SELECT * FROM theaters', []);
}
