import HeroCarousel from "../components/HeroSection";
import { MovieGrid } from "../shared/MovieList";

export default function Home(){
    return (
        <>
            <HeroCarousel/>
                <div className="m-4">
                    <h1 className="text-2xl text-red-200 font-bold">Now Showing</h1>
                </div>
            <MovieGrid/>
        </>
    )
}