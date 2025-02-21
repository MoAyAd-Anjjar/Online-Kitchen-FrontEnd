// import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
// import { IProduct } from "../Tabs/HomeProduct"; // Ensure IProduct is correctly imported
// import { useUserContext } from "./UserProvider";
// import axios from "axios";
// import useCart from "../Hook/cartHook";

// // Define the type for the cart state
// type CartState = {
//   user_id: string;
//   username: string;
//   cartList: IProduct[];
// };

// // Define the type for the CartContext
// type CartContextType = {
//   cart: CartState;
//   addToCart: (CartList: IProduct[]) => void;
//   removeFromCart: (productId: string) => void;
//   clearCart: () => void;
//   HandelIncases: (productId: string) => void;
//   HandelDecrees: (productId: string) => void;
//   SaveCartState: () => void;
// };

// // Create the Cart Context with a default value
// const CartContext = createContext<CartContextType>({
//   cart: { user_id: "", username: "", cartList: [] },
//   addToCart: () => { },
//   removeFromCart: () => { },
//   clearCart: () => { },
//   HandelIncases: () => { },
//   HandelDecrees: () => { },
//   SaveCartState: () => { }
// });

// // Define the props for the CartProvider component
// type CartProviderProps = {
//   children: ReactNode;
// };

// // Create the Cart Provider Component
// const CartProvider = ({ children }: CartProviderProps) => {
//   const { User } = useUserContext(); // Get user details from UserProvider
//   const { getUserCart, updateUserCart } = useCart()
//   // Initialize cart state with empty user details
//   const [cart, setCart] = useState<CartState>({
//     user_id: "",
//     username: "",
//     cartList: [],
//   });




//   useEffect(() => {
//     const UserCartList = async () => {
//       console.log("enter here...");

//       const data = await getUserCart(User.username, User.user_id)
//       setCart(data)
//     }
//     if (User.user_id && User.username) {
//       console.log("enter");
//       UserCartList()
//     }
//   }, [User])

//   useEffect(() => {
//     console.log("cartstat:", cart);

//   }, [cart])


//   const addToCart = (CartList: IProduct[]) => {
//     setCart((prev) => ({
//       ...prev,
//       cartList: [...prev.cartList, ...CartList],
//     }));

//   };

//   // Function to remove an item from the cart
//   const removeFromCart = (productId: string) => {
//     setCart((prev) => ({
//       ...prev,
//       cartList: prev.cartList.filter((item) => item.product_id !== productId),
//     }));

//   };

//   // Function to increase quantity
//   const HandelIncases = (productId: string) => {
//     setCart((prev) => ({
//       ...prev,
//       cartList: prev.cartList.map((item) =>
//         item.product_id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       ),
//     }))
//   };

//   // Function to decrease quantity
//   const HandelDecrees = (productId: string) => {
//     setCart((prev) => ({
//       ...prev,
//       cartList: prev.cartList.map((item) =>
//         item.product_id === productId ? { ...item, quantity: item.quantity - 1 } : item
//       ),
//     }))
//   };

//   // Function to clear the cart
//   const clearCart = () => {
//     setCart((prev) => ({
//       ...prev, cartList: []
//     }))
//   };
//   const SaveCartState = async () => {
//     await updateUserCart(cart)
//   }

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, HandelIncases, HandelDecrees, SaveCartState }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;

// // Custom hook to use the Cart Context
// export const useCartContext = () => useContext(CartContext);
