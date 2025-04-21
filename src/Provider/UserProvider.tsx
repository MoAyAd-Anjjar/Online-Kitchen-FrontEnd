import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../Components/Register/Sign_up";

type UserContextType = {
  User: IUser;
  Amount : number;
  setUser: (user: IUser) => void;
  ClearUser: () => void;
  SetAmount : (value:number) => void;
};
const UserContext = createContext<UserContextType>({
  User: {
    username: "",
    email: "",
    password: "",
    role: "user",
    phone: 0,
    uservalidateanswer: "",
    userid: "",
  },
  Amount:0,
  setUser: () => {},
  ClearUser: () => {},
  SetAmount: () => {},

});
type UserProviderProps = {
     children: ReactNode;
   };

const UserProvider = ({children}: UserProviderProps) => {
  const [User, setUserInfo] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    role: "user",
    phone: 0,
    uservalidateanswer: "",
    userid: "",
  });
  const setUser = (UserInfo: IUser) => {
    sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo))
    setUserInfo(UserInfo);
  };
  const ClearUser = () => {
    setUserInfo({
      username: "",
      email: "",
      password: "",
      role: "user",
      phone: 0,
      uservalidateanswer: "",
      userid: "",
    });
  };
  const [Amount, setAmount] = useState<number>(0);
  const SetAmount = (amount:number) => {
    
    setAmount(amount);
  };
  return (
    <UserContext.Provider  key={1} value={{ User,Amount, setUser, ClearUser,SetAmount }} >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserContext =() => useContext(UserContext);
