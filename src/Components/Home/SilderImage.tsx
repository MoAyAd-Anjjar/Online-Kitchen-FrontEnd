
import { useNavigate } from 'react-router-dom'
import Postimg from '../../Images/post.jpg'

const SilderImage = () => {
  const nav= useNavigate()
  return (
    <div className='Slider-Container'>
      <span style={{width: "100%",display: "flex",justifyContent: "center"}}>
        <span className='Info-Post'>
          <h2>Welcome to our Online Kitchen!</h2>
          <p>Discover our Dishes, Add them to your Cart, And make Purchases.</p>
          <button onClick={()=>nav("/MenuList")}>Order Now</button>
        </span>
        <img src={Postimg} alt="" />
      </span>
    </div>
  )
}

export default SilderImage
