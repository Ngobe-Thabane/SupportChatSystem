import express from 'express';
import authRouter from './routes/Auth.ts';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter);

app.listen(5000, ()=>{
  console.log('Server is running on Port 5000');
})