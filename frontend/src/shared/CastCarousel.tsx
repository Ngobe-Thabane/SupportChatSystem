import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CastMember {
  profile_path: string;
  name: string;
  character?: string;
  order?: number;
  job?: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  url: string;
}

interface MovieDetailsProps {
  data: {
    credits: {
      cast: CastMember[];
      crew: CastMember[];
    };
    reviews: {
      results: Review[];
    };
  };
}

const ITEM_WIDTH = 140; // px

const MovieDetails: React.FC<MovieDetailsProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const transitionRef = useRef(true);

  // Main cast (top billed)
  const mainCast =
    data?.credits.cast
      ?.filter((member) => member.order !== undefined && member.order <= 4)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) || [];

  // Main crew (key jobs)
  const mainCrew =
    data?.credits.crew?.filter((member) =>
      ["Director", "Screenplay", "Writer", "Producer"].includes(member.job ?? "")
    ) || [];

  // Merge cast + crew into one list
  const combinedPeople = [...mainCast, ...mainCrew];
  const totalItems = combinedPeople.length;

  // Create infinite list (duplicate start & end)
  const infiniteList = [
    ...combinedPeople.slice(-5), // last few at start
    ...combinedPeople,
    ...combinedPeople.slice(0, 5), // first few at end
  ];

  const startIndex = 5; // Start in the "real" list
  const [index, setIndex] = useState(startIndex);

  // Auto-scroll effect
  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
    startAutoScroll();
  };

  const handleNext = () => {
    setIndex((prev) => prev + 1);
    startAutoScroll();
  };

  // Handle "teleporting" when reaching cloned edges
  useEffect(() => {
    if (index === infiniteList.length - 5) {
      setTimeout(() => {
        transitionRef.current = false;
        setIndex(startIndex);
      }, 500);
    } else if (index === 0) {
      setTimeout(() => {
        transitionRef.current = false;
        setIndex(totalItems);
      }, 500);
    }
  }, [index, infiniteList.length, totalItems]);

  // Re-enable smooth transition after teleport
  useEffect(() => {
    if (!transitionRef.current) {
      setTimeout(() => {
        transitionRef.current = true;
      }, 50);
    }
  }, [index]);

  const reviews = data?.reviews?.results || [];

  return (
    <div className="mx-10 space-y-10">
      {/* Combined Carousel */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Main Cast & Crew</h1>
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            className="absolute left-0 z-10 btn btn-circle btn-sm bg-base-200 hover:bg-base-300"
            onClick={handlePrev}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Carousel */}
          <div className="carousel w-full overflow-hidden rounded-box">
            <div
              className={`flex gap-4 ${transitionRef.current ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{
                transform: `translateX(-${index * ITEM_WIDTH}px)`,
              }}
            >
              {infiniteList.map((person, idx) => (
                <div
                  key={`${person.name}-${idx}`}
                  className="carousel-item flex flex-col items-center min-w-[140px]"
                >
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://via.placeholder.com/100x100?text=No+Image"
                    }
                    alt={person.name}
                    className="rounded-full h-[100px] w-[100px] object-cover border-2 border-base-300"
                  />
                  <p className="mt-2 text-sm font-semibold text-center">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    {person.character || person.job}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-0 z-10 btn btn-circle btn-sm bg-base-200 hover:bg-base-300"
            onClick={handleNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <a
                key={review.id}
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="card w-full bg-base-300 shadow-md hover:shadow-xl transition-shadow duration-300 border border-base-200">
                  <div className="card-body">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-primary">
                          {review.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-100 mb-4 line-clamp-4">
                      {review.content}
                    </p>

                    <div className="mt-auto">
                      <span className="text-primary font-medium hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieDetails;
