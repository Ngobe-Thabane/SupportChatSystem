// import { createContext, useContext, useState, useEffect } from "react";

// import type { Message, MessageContextType } from "../interfaces/Interface";
// import { socket } from "../lib/Socket";

// const MessageContext = createContext<MessageContextType | null>(null);

// export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     socket.on("message", (message: Message) => {
//       setMessages(prev => [...prev, message]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, []);

//   const sendMessage = (msg: string) => {
//     socket.emit("message", msg);
//   };

//   return (
//     <MessageContext.Provider value={{ messages, sendMessage, socket }}>
//       {children}
//     </MessageContext.Provider>
//   );
// };


// export const useMessages = () => {
//   const context = useContext(MessageContext);
//   if (!context) throw new Error("useMessages must be used within MessageProvider");
//   return context;
// };
