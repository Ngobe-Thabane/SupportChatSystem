import { BrowserRouter, Route, Routes } from 'react-router'
import NavBar from './Navbar';
import MovieDetails from '../shared/MovieDetails';
import Home from '../pages/Home';
import AuthForm from './AuthForm';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashBoard';
import UserLayout from '../layouts/UserLayout';
import UserDashboard from '../pages/user/UserDashboard';
import { MovieGrid } from '../shared/MovieList';
import { Movies } from '../pages/admin/MoviesAPIs';
import MovieSchedulePage from '../pages/admin/MovieSchedule';
import { useEffect } from 'react';
import { useTheaterList } from '../stores/useTheaterStore';
import { getTheaterList } from '../lib/GetMovies';

function App() {

  const setTheaters = useTheaterList((state)=>state.seTheaters);
  
  useEffect(()=>{
    const getTheaters = async ()=>{
      const theater = await getTheaterList();
      console.log(theater)
      setTheaters(theater);
    }
    getTheaters();
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/movieDetails' element={<MovieDetails/>}/>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
        </Route>

        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminDashboard />} />
          <Route path='/admin/movies' element={<Movies/>}/>
          <Route path='/admin/addMovie' element={<MovieSchedulePage/>}/>
        </Route>

        <Route path='/user' element={<UserLayout/>}>
          <Route index element={<UserDashboard/>}/>
          <Route path='/user/explore' element={<MovieGrid/>} />
          <Route path='/user/moviedetails' element={<MovieDetails/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
