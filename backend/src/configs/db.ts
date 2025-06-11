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
export default db;