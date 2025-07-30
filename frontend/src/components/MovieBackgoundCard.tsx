import React from 'react';

interface MovieCardProps {
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterUrl }) => {
  return (
    <div className="card lg:card-side bg-base-100/10 shadow w-full">
      <figure className="relative lg:w-1/3 -mt-20 ml-4">
        <img src={posterUrl} alt="Movie Poster" className="rounded-xl border-4 border-base-100 shadow-md" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">The Batman</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="badge badge-warning text-black">PG-13</div>
          <div className="badge badge-neutral">2022</div>
          <div className="badge badge-neutral">2h 56m</div>
          <div className="badge badge-primary">Action</div>
          <div className="badge badge-primary">Crime</div>
          <div className="badge badge-primary">Drama</div>
        </div>
        <p>
          In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own
          family while facing the serial killer known as the Riddler.
        </p>
        <div className="text-sm text-gray-400">
          <strong className="text-white">Rating:</strong> 8.2/10
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
