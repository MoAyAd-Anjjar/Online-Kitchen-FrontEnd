
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Register/Login'
import Sign_up from './Components/Register/Sign_up'
import PageNotFound from './Components/Register/pageNotFound/404page'
import Home from './Components/Home/Home'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Sign_up" element={<Sign_up/>} />

    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
