import "./Register.css";
import {FaPhone, FaUser } from "react-icons/fa6";
import { CgPassword } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { BsInputCursorText } from "react-icons/bs";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useUser from "../../Hooks/UserHook";

export interface IUser {
  username: string;
  password: string;
  email: string;
  userid: string |number;
  favoritefood?: [string|number];
  phone: number;
  uservalidateanswer: string;
  role: string;
}
const Sign_up = () => {

  const {CreateUser}=useUser()
  const [NewUser, setNewUser] = useState<IUser>({
    username: "",
    password: "",
    email: "",
    userid: Date.now(),
    favoritefood: [""],
    phone: 0,
    uservalidateanswer: "",
    role: "user",
  });

  const HandleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (NewUser.username && NewUser.password && NewUser.email && NewUser.phone && NewUser.uservalidateanswer && NewUser.userid) {
      await  CreateUser(NewUser)
    } else {
      toast.warning("Please Fill the Fields first!!!",{position: "top-right"});
    }
  };

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));

    
  };

  return (
    <div className="Register-Container">
      <form className="Form-Flex" onSubmit={HandleCreation}>
        <h1>Sign up</h1>

        <span>
          <div className="Icon_login">
            <FaUser size={20} color="rgb(53, 53, 53)" />
          </div>
          <input
            type="text"
            name="username"
            maxLength={18}
            placeholder="Enter your Username"
            onChange={HandleChange}
          />
        </span>

        <span>
          <div className="Icon_login">
            <CgPassword size={20} color="rgb(53, 53, 53)" />
          </div>
          <input
            type="password"
            name="password"
            placeholder=" Enter your Password"
            onChange={HandleChange}
          />
        </span>

        <span>
          <div className="Icon_login">
            <MdEmail size={20} color="rgb(53, 53, 53)" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={HandleChange}
          />
        </span>

        <span>
          <div className="Icon_login">
            <FaPhone size={20} color="rgb(53, 53, 53)" />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number..."
            onChange={HandleChange}
          />
        </span>

        <span>
          <div className="Icon_login">
            <BsInputCursorText size={20} color="rgb(53, 53, 53)" />
          </div>
          <input
            type="text"
            name="uservalidateanswer"
            placeholder="Enter what you like (for retrieving account)"
            onChange={HandleChange}
          />
        </span>

        

        <button type="submit" >
          Create New Account
        </button>
      </form>
    </div>
  );
};

export default Sign_up;
