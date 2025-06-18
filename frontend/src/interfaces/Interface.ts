import { Socket } from "socket.io-client";

export type Login ={
  email:string,
  password:string
}

export type Register = {
  name: string,
  email: string,
  password:string
}

export type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
};

export type MessageContextType = {
  messages: Message[];
  sendMessage: (msg: string) => void;
  socket: Socket;
};

export type MovieData = {
  movie_id: string;
  title : string;
  image_url:string,
  description: string,
  genres : Array<number>,
  duration_minutes: number;
  release_date: null|string

}
export type Movie = {
  title : string;
  poster_path : string
  release_date : string,
  overview: string
}