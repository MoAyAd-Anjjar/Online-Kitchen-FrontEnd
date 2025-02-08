
import Postimg from '../../Images/post.jpg'
const SilderImage = () => {
  return (
    <div className='Slider-Container'>
      <span style={{width: "100%",display: "flex",justifyContent: "center"}}>
        <span className='Info-Post'>
          <h2>Welcome to our Online Shop!</h2>
          <p>Discover our products, add them to your cart, and make purchases.</p>
          <button>Order Now</button>
        </span>
        <img src={Postimg} alt="" />
      </span>
    </div>
  )
}

export default SilderImage
