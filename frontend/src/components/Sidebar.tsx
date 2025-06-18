import { Link } from "react-router";

export function Sidebar(){

  return (
    <section className=" flex flex-col gap-4 my-8 p-3">
      <Link to={'/movies'} className=" link-info">Movie Management</Link>
      <Link to={'/theater' } className="link-info">Theater Management</Link>
      <Link to={'/showtime'} className="link-info">showtime</Link>
    </section>
  )
}