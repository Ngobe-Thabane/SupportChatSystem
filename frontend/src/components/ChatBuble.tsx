
export default function ChatBuble({isUser, message}:{isUser:boolean, message:string}){

  return (
    <div className={`chat ${isUser ? "chat-start": "chat-end"}`}>
      <div className="chat-bubble">{message}</div>
    </div>
  )
  
}