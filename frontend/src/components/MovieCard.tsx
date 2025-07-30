import { Link } from "react-router";

export function MovieCard(){

  return (
    <>
      <div className="m-4 mb-8 px-4 w-fit bg-base-100">
        <div className="rounded-lg bg-base-100 shadow-lg">
          <img src="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg" alt="movie poster" className="rounded-t-lg h-96" />
          <div className="p-2">
            <Link to={'/moviedetails'}>
              <h2 className="mb-2 text-lg font-semibold">Movie Title</h2>
            </Link>
            <div className="flex gap-3">
              <a href="#" className="badge">action</a>
              <a href="#" className="badge">scifi</a>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}