import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserContainer from './layouts/userLayout/UserContainer'
import Home from './pages/Home'
import Mentors from './pages/Mentors'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserContainer/>}>
        <Route index element={<Home/>}/>
        <Route path='mentors' element={<Mentors/>}/>
        </Route>
       
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
