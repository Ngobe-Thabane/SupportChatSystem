import { createClient } from "redis";
import { config } from "dotenv";
config({path:'./.env'});

const client = createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err)=>{
  console.log('Redis client error ', err);

});

client.connect();
export default client;