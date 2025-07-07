import { BrowserRouter, Route, Routes } from 'react-router'
import Hero from '../pages/Hero'
import DashBoard from '../pages/Dashboard'
import { Movies } from '../pages/Movies';
import { MovieTable } from './MovieTable';
import { Sidebar } from './Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>}/>
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
