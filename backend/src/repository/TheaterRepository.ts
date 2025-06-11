import db from "../configs/db.ts";

async function addTheater(name:string, location:string){
  return await db.query('INSERT INTO TABLE theater(name, location) VALUES($1,$2)', [name, location]);
}

async function getTheater(name:string) {
  return await db.query('SELECT * FROM theater WHERE name=$1', [name]);
}

async function deleteTheater(theater_id:string) {
  return db.query('DELETE FROM theater WHERE theater_id=$1', [theater_id]);
}
async function getTheaters() {
  return await db.query('SELECT * FROM theater', []);
}