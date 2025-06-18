import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router"
import type { MovieData } from "../interfaces/Interface";

export function MovieTable(){
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem('token');
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
  }, [])
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Poster</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.map((movie, index)=>{
              return (<RowData movie={movie} index={index} token={token as string} />)
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Link to={'/addMovies'} className="link-info" >Add Movie</Link>
            </th>
          </tr>
          <tr></tr>
        </tfoot>
      </table>
    </div>
  )
}


function RowData({index, movie, token}:{index:number, movie:MovieData, token:string}){
  
  const deleteMovie = async()=>{

    try{
      const delMovie = await axios.delete('http://localhost:5000/movie', {
        headers:{
          'Content-Type' :'application/json',
          'Authorization' : `Bearer ${token}`
        },
        data: {id:movie.movie_id}
      })

      if(delMovie.status === 200) alert('Movie deleted');

    }catch(err){
      alert(err)
    }
  }
  return (
    <tr>
      <th>{index+1}</th>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img
              src={movie.image_url}
              alt={movie.title}/>
          </div>
        </div>
      </td>
      <td>{movie.title}</td>
      <td>{movie.description}</td>
      <td><button onClick={deleteMovie}>delete</button></td>
    </tr>
  )
}