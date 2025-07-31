import { MovieCard } from "./MovieCard";

export function MovieGrid(){
    return (
        <div className="px-6 py-12 bg-base-100">
             {/* <h2 className="text-2xl font-bold mb-8 text-center text-primary">
                Now Showing
            </h2> */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <MovieCard/>
            </div>
        </div>
    )
}