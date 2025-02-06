
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Register/Login'
import Sign_up from './Components/Register/Sign_up'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Sign_up" element={<Sign_up/>} />

    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
