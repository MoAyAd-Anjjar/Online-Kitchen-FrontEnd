
import "./Register.css"
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'
import { CgPassword } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'

const Login = () => {
    return (
        <div className='Register-Container'>
            <form className='Form-Flex'>
            <h1>Sign in</h1>
                <span><div className='Icon_login'><FaUser  size={"20"} color='rgb(53, 53, 53)'></FaUser></div><input type="text" placeholder="Username" /></span>
                <span><div className='Icon_login'><CgPassword size={"20"} color='rgb(53, 53, 53)'></CgPassword></div><input type="password" placeholder="Password" /></span>
                <span><div className='Icon_login'><MdEmail  size={"20"} color='rgb(53, 53, 53)'></MdEmail></div><input type="email" placeholder="Email" /></span>
                <button type="submit">Login</button>
                <span>
                    <Link to={"/"}>
                        Forget Password?
                    </Link>
                    <Link to={"/Sign_up"}>
                        <br></br> 
                        Don't have an account?Create New Account
                    </Link>
                </span>

            </form>
        </div>
    )
}

export default Login
