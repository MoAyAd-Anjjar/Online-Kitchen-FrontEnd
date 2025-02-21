import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { IFoodItem } from "../Components/Forum/Forum";

const useFood = () => {
  const navigate = useNavigate();

  const CreateFood = async (FoodInfo: IFoodItem): Promise<void> => {
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;

    if (!baseUrl) {
      console.error("VITE_API_URL is not defined. Check your .env file.");
      throw new Error("Server URL is not defined.");
    }

    try {
      const response: AxiosResponse = await axios.post(
        `${baseUrl}/Food/CreateFood`,
        FoodInfo
      );

      if (response.status === 201) {
        toast.success("Food created successfully", { position: "top-center" });
        navigate("/MenuList");
      } else {
        toast.error("Error creating food", { position: "top-center" });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Error: ${error.response.data.message || "Request failed"}`,
          {
            position: "top-center",
          }
        );
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
        });
      }
    }
  };

  const GetFoods = async () => {
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
   
    
    if (!baseUrl) {
      console.error("VITE_API_URL is not defined. Check your .env file.");
      throw new Error("Server URL is not defined.");
    }
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/Food/GetFoods`
      );

      if (response.status === 200) {
        return response.data.Data;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Failed to Retrieve Food", { position: "top-center" });
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
        });
      }
    }
  };

  return { CreateFood, GetFoods };
};
export default useFood;
