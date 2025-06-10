import { config } from 'dotenv';
import {Client} from 'pg';

config({path: 'src/configs/.env', encoding:'utf8'});

const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT as string)
})

db.connect();

db.query(`CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
)
`);

db.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');

db.query(`CREATE TABLE IF NOT EXISTS movies (
  movie_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image_url text,
  description TEXT,
  genres integer[],
  duration_minutes INT NOT NULL,
  release_date DATE
)`);

db.query(`CREATE TABLE IF NOT EXISTS genres (
  genre_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  api_genre_id integer NOT NULL)`)


export default db;