import { BrowserRouter, Route, Routes } from 'react-router'
import NavBar from './Navbar';
import MovieDetails from '../pages/MovieDetails';
import Home from '../pages/Home';
import AuthForm from '../pages/AuthForm';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashBoard';
import UserLayout from '../layouts/UserLayout';
import UserDashboard from '../pages/user/UserDashboard';
import { MovieGrid } from './MovieGrid';
import { Movies } from '../pages/Movies';
import { MovieTable } from './MovieTable';

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
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminDashboard />} />
          <Route path='/admin/movies' element={<Movies/>}/>
          <Route path='/admin/catalog' element={<MovieTable/>}/>
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
