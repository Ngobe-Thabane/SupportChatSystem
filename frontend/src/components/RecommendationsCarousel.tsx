import { useRef } from "react";
import type { Movie } from "../interfaces/Movies.interface";

type RecommendationsCarouselProps = {
  recommendations: Movie[];
  onSelectMovie: (movie: Movie) => void;
};

export default function RecommendationsCarousel({
  recommendations,
  onSelectMovie,
}: RecommendationsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-10 px-6">
      <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-gray-700 bg-opacity-50 hover:bg-opacity-80 text-white rounded-full p-2"
        >
          &#8592;
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-4"
        >
          {recommendations.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-40 cursor-pointer"
              onClick={() => onSelectMovie(movie)}
              title={movie.title}
            >
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-[200px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-2 text-center text-sm font-semibold text-gray-300 truncate">
                {movie.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-gray-700 bg-opacity-50 hover:bg-opacity-80 text-white rounded-full p-2"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
