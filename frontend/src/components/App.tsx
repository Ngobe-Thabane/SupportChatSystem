import { BrowserRouter, Route, Routes } from 'react-router'
import NavBar from './Navbar';
import MovieDetails from '../pages/MovieDetails';
import Home from '../pages/Home';
import AuthForm from '../pages/AuthForm';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashBoard';
import UserLayout from '../layouts/UserLayout';
import UserDashboard from '../pages/user/UserDashboard';

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
        </Route>
        <Route path='/user' element={<UserLayout/>}>
          <Route index element={<UserDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
