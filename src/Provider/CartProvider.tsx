import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { IFoodItem } from "../Components/Forum/Forum";
import { IUser } from "../Components/Register/Sign_up";
import useCart from "../Hooks/CartHook";

// Define the type for the cart state
export type CartState = {
  userid: number | string;
  username: string;
  userList: IFoodItem[];
};

// Define the type for the CartContext
type CartContextType = {
  cart: CartState;
  addToCart: (userList: IFoodItem[]) => void;
  removeFromCart: (FoodID: number) => void;
  clearCart: () => void;
  HandelIncases: (FoodID: number) => void;
  HandelDecares: (FoodID: number) => void;
};

// Create the Cart Context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props for the CartProvider component
type CartProviderProps = {
  children: ReactNode;
};

// Create the Cart Provider Component
const CartProvider = ({ children }: CartProviderProps) => {
  const [UserInfo, setUserInfo] = useState<IUser | null>(null);
  const { ChangeCartState, GetUserCart } = useCart();

  // Initialize cart state
  const [cart, setCart] = useState<CartState>({
    userid: "",
    username: "",
    userList: [],
  });

  // Load user info from session storage
  useEffect(() => {
    const sessionData = sessionStorage.getItem("UserInfo");
    if (sessionData) {
      setUserInfo(JSON.parse(sessionData));
    }
  }, []);

  // Update cart state when UserInfo changes
  useEffect(() => {
    if (UserInfo) {
      const GetUserCART = async () => {
        const getCartList:CartState = await GetUserCart(UserInfo.userid, UserInfo.username);
        setCart(getCartList);
      };
      GetUserCART();
    }
  }, [UserInfo]);

  // Track cart updates (for debugging)
  useEffect(() => {

 
    
    const updateCart = async () => {

      await ChangeCartState(cart);
    };
    if(cart.userList&& cart.username)
    updateCart();
  }, [cart]);

  // Function to add items to the cart
  const addToCart = (CartList: IFoodItem[]) => {
    
    CartList.forEach((item) => {
      const index = cart.userList.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      // If the item is not found (index is -1), add it to the cart
      if (index === -1) {
        setCart((prev) => ({
          ...prev,
          userList: [...prev.userList, item],
        }));
      }
      });

 
    };

  // Function to remove an item from the cart
  const removeFromCart = (FoodID: number) => {
    setCart((prev) => ({
      ...prev,
      userList: prev.userList.filter((item) => item.id !== FoodID),
    }));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart((prev) => ({
      ...prev,
      userList: [],
    }));
  };

  const HandelDecares = (foodID: number) => {
    // Decrease the quantity of the food item
    setCart((prev) => ({
      ...prev,
      userList: prev.userList.map((item) =>
        item.id === foodID && item.quantity !== 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  };

  const HandelIncases = (foodID: number) => {
    // Decrease the quantity of the food item
    setCart((prev) => ({
      ...prev,
      userList: prev.userList.map((item) =>
        item.id === foodID ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        HandelDecares,
        HandelIncases,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// Custom hook to use the Cart Context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
