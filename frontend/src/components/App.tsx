import { BrowserRouter, Route, Routes } from 'react-router'
import Hero from '../pages/Hero'
import DashBoard from '../pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/dashboard' element={<DashBoard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
