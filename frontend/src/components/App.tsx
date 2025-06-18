import { BrowserRouter, Route, Routes } from 'react-router'
import Hero from '../pages/Hero'
import DashBoard from '../pages/Dashboard'
import { Movies } from '../pages/Movies';
import NavBar from './Navbar';
import { MovieTable } from './MovieTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route element={<NavBar/>} >
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/movies' element={<MovieTable/>} />
          <Route path='/addMovies' element={<Movies/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
