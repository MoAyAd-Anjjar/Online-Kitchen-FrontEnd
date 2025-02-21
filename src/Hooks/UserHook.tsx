import axios from "axios";
import { IUser } from "../Components/Register/Sign_up";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Provider/UserProvider";

const useUser = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const CreateUser = async (
    UserInfo: IUser
  ): Promise<String | Number | any> => {
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;

    const response = await axios.post(
      `${baseUrl}/User/CreateUser`,
      UserInfo
    );

    if (response.status === 201) {
      navigate("/");
      return response.status;
    } else {
      toast.error(
        "Something went wrong, user may already exist or server is down",
        { position: "top-center" }
      );
      return;
    }
  };

  const GetUser = async (username: string, password: string, email: string) => {
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;

    try {
      const response: any = await axios.get(
        `${baseUrl}/User/GetUser?username=${username}&password=${password}&email=${email}`
      );

      if (response.status === 200) {
        setUser(response.data);
        navigate("/Home",{replace:true});
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error(
          "Invalid credentials or user not found. Please sign up or check your credentials.",
          { position: "top-center" }
        );
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
        });
      }
    }
  };

  return { CreateUser, GetUser };
};
export default useUser;
