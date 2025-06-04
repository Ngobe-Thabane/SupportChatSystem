import ChatBuble from "../components/ChatBuble";
import ChatInput from "../components/ChatInput";
import NavBar from "../components/Navbar";

export default function DashBoard(){
  return (
    <article>
      <NavBar/>

      <section className="h-lvh grid grid-cols-[1fr_4fr] grid-rows-[1fr_auto]">
        <div className='row-span-2 border-r border-gray-800'>

        </div>
        <div className='p-2 flex flex-col gap-2'>
          <ChatBuble isUser={true} message="hello need help"/>
          <ChatBuble isUser={true} message="hi there"/>
          <ChatBuble isUser={false} message="how are you"/>
        </div>
        <ChatInput/>

      </section>
    </article>
  )
}