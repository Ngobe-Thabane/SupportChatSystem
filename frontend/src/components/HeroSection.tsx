
import { useEffect, useState } from "react";

const slides = [
    {
        "id": 574475,
        "genres": [27, 9648],
        "title": "Final Destination Bloodlines",
        "description": "Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.",
        "image": "https://image.tmdb.org/t/p/original/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg"
    },
    {
        "id": 1426776,
        "genres": [53, 18, 80],
        "title": "STRAW",
        "description": "What will be her last straw? A devastatingly bad day pushes a hardworking single mother to the breaking point — and into a shocking act of desperation.",
        "image": "https://image.tmdb.org/t/p/original/t3cmnXYtxJb9vVL1ThvT2CWSe1n.jpg"
    },
    {
        "id": 552524,
        "genres": [10751, 878, 35, 12],
        "title": "Lilo & Stitch",
        "description": "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
        "image": "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg"
    }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
        className={`hero min-h-screen transition-all bg-center duration-700 z-10`}
        style={{backgroundImage:`url(${slide.image})`, backgroundSize:'cover', backgroundPosition:'center'}}
        >
        <div className="hero-overlay bg-black/60 bg-opacity-60" ></div>
        <div className="hero-content text-white text-left max-w-2xl">
          <div>
            <h1 className="text-5xl font-bold mb-2">{slide.title}</h1>
            <p className="text-sm uppercase text-primary font-semibold mb-4">
              {/* {slide.genres} */}
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
