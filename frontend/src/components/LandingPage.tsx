
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi, Adventure",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image:
      "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action, Crime, Drama",
    description:
      "Batman faces his toughest enemy yet – the Joker – as he fights for Gotham's soul.",
    image:
      "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 3,
    title: "Dune: Part Two",
    genre: "Sci-Fi, Epic",
    description:
      "Paul Atreides unites with the Fremen and sets out to fulfill his destiny on Arrakis.",
    image:
      "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full min-h-screen">
      <div
        className={`hero min-h-screen transition-all bg-[url(${slide.image})] bg-cover bg-center  duration-700 z-10`}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-white text-left max-w-2xl">
          <div>
            <h1 className="text-5xl font-bold mb-2">{slide.title}</h1>
            <p className="text-sm uppercase text-primary font-semibold mb-4">
              {slide.genre}
            </p>
            <p className="mb-6">{slide.description}</p>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-10">
        <button onClick={prevSlide} className="btn btn-circle">
          ❮
        </button>
        <button onClick={nextSlide} className="btn btn-circle">
          ❯
        </button>
      </div>
    </div>
  );
}
