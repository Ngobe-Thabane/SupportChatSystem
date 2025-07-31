import type { Movie } from '../interfaces/Movies.interface';

export default function MovieCard({ movie }:{movie:Movie}){
  return (
    <div className="card lg:card-side bg-base-100 shadow w-full">
      <figure className="relative lg:w-1/3 -mt-20 ml-4">
        <img src={movie.poster_url} alt="Movie Poster" className="rounded-xl border-4 border-base-100 shadow-md" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-3xl my-2">{movie.title}</h2>
        <div className="flex flex-wrap gap-2 items-center">
          {
            movie.genres &&
            movie.genres.map((genre)=>{
              return <div className="badge badge-primary" key={genre}>{genre}</div>
            })
          }
        </div>
        <p className='my-2'>{movie.description}</p>
      </div>
    </div>
  );
};
