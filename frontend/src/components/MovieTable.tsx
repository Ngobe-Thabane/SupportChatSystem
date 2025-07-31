import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Toast } from "./Toast";
import type { Movie } from "../interfaces/Movies.interface";
import { useAuthStore } from "../stores/useAuthStore";

export function MovieTable(){
  const [movies, setMovies] = useState([]);
  const [movieDeleted, setMovieDeleted] = useState(false);
  const token = useAuthStore((state)=>state.user?.token);
  useEffect(()=>{
    const getMovies = async () =>{

      try{
        const currentMovies = await axios.get('http://localhost:5000/movies', {
          headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        })
        setMovies(currentMovies.data);

      }catch(err){
        alert(err)
      }

    }
    getMovies();
  }, [movieDeleted])
  return (
    <section className="flex-1">
      <div className="flex justify-between px-5 my-4">
        <h1 className="text-3xl font-bold">MovieTime</h1>
        <Link to={'/admin/movies'} className="btn btn-primary" >Add Movie</Link>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-10 mx-4 my-2 w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Poster</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              movies.map((movie, index)=>{
                return (<RowData movie={movie} index={index} token={token as string} movieDeleted={setMovieDeleted} />)
              })
            }
          </tbody>
        </table>
      </div>
   
    </section>
  )
}


function RowData({index, movie, token, movieDeleted}:{index:number, movie:Movie, token:string, movieDeleted:(isDeleted:boolean)=>void}){
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(()=>{
    if(isDeleting){
      setTimeout(()=>{
        movieDeleted(true);
      }, 1000)
    }
  }, [isDeleting])
  const deleteMovie = async()=>{

    try{
      const delMovie = await axios.delete('http://localhost:5000/movie', {
        headers:{
          'Content-Type' :'application/json',
          'Authorization' : `Bearer ${token}`
        },
        data: {id:movie.movie_id}
      })

      if(delMovie.status === 200){
        setIsDeleting(true);
      }

    }catch(err){
      alert(err)
    }
  }
  return (
    <> 
      <Toast text="Movie deleted" action={isDeleting} />
      <tr>
        <th>{index+1}</th>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={movie.poster_url}
                alt={movie.title}/>
            </div>
          </div>
        </td>
        <td>{movie.title}</td>
        <td><button onClick={deleteMovie} className="btn btn-secondary">delete</button></td>
      </tr>
    </>
  )
}