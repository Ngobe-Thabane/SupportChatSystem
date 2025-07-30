import { BrowserRouter, Route, Routes } from 'react-router'
import Hero from '../pages/Hero'
import DashBoard from '../pages/Dashboard'
import { Movies } from '../pages/Movies';
import { MovieTable } from './MovieTable';
import { Sidebar } from './Sidebar';
import NavBar from './Navbar';
import MovieDetails from '../pages/MovieDetails';
import Home from '../pages/Home';
import AuthForm from '../pages/AuthForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/movieDetails' element={<MovieDetails/>}/>
        </Route>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route element={<Sidebar/>} >
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/movies' element={<MovieTable/>} />
          <Route path='/addMovies' element={<Movies/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
