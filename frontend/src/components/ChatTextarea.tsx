import { useState } from "react";
// import { useMessages } from "../context/MessageContext";

export default function ChatTextarea() {
  // const {sendMessage} = useMessages();
  const [message, setMessage] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      // sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="col-start-2 h-40 border-t border-gray-800 p-2 flex gap-2 items-end">
      <textarea
        placeholder="Type your message"
        className="textarea textarea-md w-full h-full resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className="btn btn-primary h-12 w-12 flex items-center justify-center"
        disabled={!message.trim()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
      </button>
    </div>
  );
}
