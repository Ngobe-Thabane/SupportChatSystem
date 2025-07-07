import { Link, Outlet } from "react-router";

export function Sidebar(){

  return (
    <section className="flex gap-8">
      <aside className=" flex flex-col gap-4 my-8 p-3 h-screen sticky top-4 w-[200px]">
        <Link to={'/movies'} className=" link-info">Movie Management</Link>
        <Link to={'/theater' } className="link-info">Theater Management</Link>
        <Link to={'/showtime'} className="link-info">showtime</Link>
      </aside>
      <Outlet/>
    </section>
  )
}