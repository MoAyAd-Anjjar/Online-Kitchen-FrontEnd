import "./Register.css";
import { FaUser } from "react-icons/fa6";
import { CgPassword } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { BsInputCursorText } from "react-icons/bs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sign_up = () => {
    const navigate = useNavigate();
    const [NewUser, setNewUser] = useState<{ username?: string; password?: string; email?: string; extra?: string }>({});

    const HandleCreation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (NewUser.username && NewUser.password && NewUser.email) {
            localStorage.setItem("UserInfo", JSON.stringify(NewUser));
            navigate("/");
        } else {
            alert("Please fill all the fields");
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
                    <input type="text" name="username" placeholder="Username" onChange={HandleChange} />
                </span>

                <span>
                    <div className="Icon_login">
                        <CgPassword size={20} color="rgb(53, 53, 53)" />
                    </div>
                    <input type="password" name="password" placeholder="Password" onChange={HandleChange} />
                </span>

                <span>
                    <div className="Icon_login">
                        <MdEmail size={20} color="rgb(53, 53, 53)" />
                    </div>
                    <input type="email" name="email" placeholder="Email" onChange={HandleChange} />
                </span>

                <span>
                    <div className="Icon_login">
                        <BsInputCursorText size={20} color="rgb(53, 53, 53)" />
                    </div>
                    <input type="text" name="extra" placeholder="Enter what you like" onChange={HandleChange} />
                </span>

                <button type="submit" style={{ width: "auto" }}>Create New Account</button>
            </form>
        </div>
    );
};

export default Sign_up;
