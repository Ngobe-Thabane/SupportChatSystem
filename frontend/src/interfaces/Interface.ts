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
