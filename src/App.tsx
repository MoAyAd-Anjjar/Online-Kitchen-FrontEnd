import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Register/Login";
import Sign_up from "./Components/Register/Sign_up";
import PageNotFound from "./Components/Register/pageNotFound/404page";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import Menu from "./Components/Menu/Menu";
import Cart from "./Components/Cart/Cart";

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
  const [user, setuser] = useState<any>(null);
  const setUser = (User: any) => {
    setuser(User);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("UserInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])

  return (
    <BrowserRouter>
      <RootStyleUpdater />
      {user ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Login User={setUser} />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign_up" element={<Sign_up />} />
        <Route path="/MenuList" element={<Menu />} />
        <Route path="/Cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
