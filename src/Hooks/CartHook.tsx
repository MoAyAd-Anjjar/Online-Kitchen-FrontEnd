import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { CartState } from "../Provider/CartProvider";

const useCart = () => {
  const ChangeCartState = async (cart:CartState): Promise<void> => {
  
    
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;

    if (!baseUrl) {
      console.error("VITE_API_URL is not defined. Check your .env file.");
      throw new Error("Server URL is not defined.");
    }

    try {
      const response: AxiosResponse = await axios.put(
        `${baseUrl}/Cart/CartUpdate`,
        cart
      );

      if (response.status === 201) {
        return
      } else {
        toast.error("Error Updating Cart", { position: "top-center" });
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
  const GetUserCart = async (userid:string|number,username:string): Promise<any> => {
  
    
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;

    if (!baseUrl) {
      console.error("VITE_API_URL is not defined. Check your .env file.");
      throw new Error("Server URL is not defined.");
    }

    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/Cart/CartList?username=${username}&userid=${userid}`
      );
      
      
      
      if (response.status === 200) {
        return response.data
      } else {
        toast.error("Error Retrieve Cart", { position: "top-center" });
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

  return { ChangeCartState,GetUserCart };
};

export default useCart;
