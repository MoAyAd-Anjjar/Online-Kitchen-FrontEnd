
import "./Home.css"
import Middle from './Middle'
import Service from "./Service"
import SilderImage from './SilderImage'
const Home = () => {
  return (
    <div className='Home-Container'>

      <SilderImage></SilderImage>
      <Middle></Middle>
      <Service></Service>
    </div>
  )
}

export default Home
