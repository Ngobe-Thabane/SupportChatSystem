
import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export default function DashBoard(){
  return (
    <article>
      <section>
        <Sidebar />
        {/* <Outlet /> */}
      </section>
    </article>
  )
}