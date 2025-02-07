
import "./Register.css"
import { FaUser } from 'react-icons/fa6'
import { CgPassword } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'
import { BsInputCursorText } from "react-icons/bs"

const Sign_up = () => {
    return (
        <div className='Register-Container'>
            <form className='Form-Flex'>
            <h1>Sign up</h1>
                <span><div className='Icon_login'><FaUser  size={"20"} color='rgb(53, 53, 53)'></FaUser></div><input type="text" placeholder="Username" /></span>
                <span><div className='Icon_login'><CgPassword size={"20"} color='rgb(53, 53, 53)'></CgPassword></div><input type="password" placeholder="Password" /></span>
                <span><div className='Icon_login'><MdEmail  size={"20"} color='rgb(53, 53, 53)'></MdEmail></div><input type="email" placeholder="Email" /></span>
                <span><div className='Icon_login'><BsInputCursorText  size={"20"} color='rgb(53, 53, 53)'></BsInputCursorText></div><input type="text" placeholder="Enter what you like" /></span>
                <button type="submit" style={{width:"auto"}}>Create New Account</button>
                

            </form>
        </div>
    )
}

export default Sign_up
