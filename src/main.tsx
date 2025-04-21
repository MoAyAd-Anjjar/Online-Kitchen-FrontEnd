import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UserProvider from "./Provider/UserProvider.tsx";
import CartProvider from "./Provider/CartProvider.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
    <App />
      </CartProvider>
    </UserProvider>
  </StrictMode>

);
