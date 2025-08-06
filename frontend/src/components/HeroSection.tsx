
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

const genreMap = {
  27: "Horror",
  53: "Thriller",
  18: "Drama",
  80: "Crime",
  9648: "Mystery",
  10751: "Family",
  878: "Sci-Fi",
  35: "Comedy",
  12: "Adventure"
};


export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="p-6 md:p-10 h-[80vh] w-full flex flex-col bg-bottom   text-white z-10 inset-0 bg-gradient-to-b from-[#252525ff] to-[#25252500] backdrop-blur-sm"
    >
  {/* Movie Title */}
  <img src={slide.image} className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 " />
    <div className="absolute inset-0 bg-gradient-to-l p-6 from-[#25252500] to-[#252525ff] z-10 flex flex-col justify-end">

  <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
    {slide.title}
  </h1>

  {/* Genre tags */}
  {slide.genres?.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-4">
      {slide.genres.map((g, i) => (
        <span
          key={i}
          className="bg-white/10 text-white text-xs font-medium px-3 py-1 rounded-full"
        >
          {typeof g === "string" ? g : genreMap[g]}
        </span>
      ))}
    </div>
  )}

  {/* Movie Overview */}
  <p className="text-sm md:text-base text-gray-100 mb-6 w-[60%]">
    {slide.description}
  </p>

  {/* Actions */}
  {/* <div className="flex flex-wrap gap-4">
    <button className="btn btn-primary text-white">Book Now</button>
    <button className="btn btn-outline border-white text-white hover:bg-white/10">
      Watch Trailer
    </button>
  </div> */}
</div>
</div>



  );
}
