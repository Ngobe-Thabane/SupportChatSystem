import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
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
import { getGenres, getTheaterList} from '../lib/GetMovies';
import { useGenres, useTheaterList } from '../stores/useMovieStore';
import CinemaSeatPreview from './CinemSeat';

function App() {

  const setTheaters = useTheaterList((state)=>state.seTheaters);
  const setGenres = useGenres((state)=>state.setGenres);


  const getTheaters = async ()=>{
    const theater = await getTheaterList();
    setTheaters(theater);
  }
  
  const getGenresList = async()=>{
    const genres = await getGenres();
    setGenres(genres);
  }
  
  useEffect(()=>{
    getTheaters();
    getGenresList();
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/movieDetails' element={<MovieDetails/>}/>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path='/seats' element={<CinemaSeatPreview/>}/>
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // or "smooth"
  }, [pathname]);

  return null;
}
