import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../Components/Register/Sign_up";

type UserContextType = {
  User: IUser;
  setUser: (user: IUser) => void;
  ClearUser: () => void;
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
  setUser: () => {},
  ClearUser: () => {},
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
  return (
    <UserContext.Provider  key={1} value={{ User, setUser, ClearUser }} >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserContext =() => useContext(UserContext);
