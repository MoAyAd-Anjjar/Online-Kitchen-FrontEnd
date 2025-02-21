import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Register/Login";
import Sign_up from "./Components/Register/Sign_up";
import PageNotFound from "./Components/Register/pageNotFound/404page";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { useEffect } from "react";
import Menu from "./Components/Menu/Menu";
import Cart from "./Components/Cart/Cart";
import Forum from "./Components/Forum/Forum";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "./Provider/UserProvider";
import Favorite from "./Components/Favorite/Favorite";

const RootStyleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/Sign_up") {
      document.documentElement.style.setProperty("--root-height", "100vh");
    } else {
      document.documentElement.style.setProperty("--root-height", "unset");
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

function App() {
  const { User } = useUserContext();
 


  return (
    <BrowserRouter>
      <ToastContainer />
      <RootStyleUpdater />

      {/* Conditionally render Header */}
      {User.userid || window.location.pathname !== "/" ? <Header /> : null}

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign_up" element={<Sign_up />} />
        <Route path="/MenuList" element={<Menu />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Favorite" element={<Favorite />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
