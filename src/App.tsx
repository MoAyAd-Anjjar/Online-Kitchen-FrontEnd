import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Register/Login";
import Sign_up from "./Components/Register/Sign_up";
import PageNotFound from "./Components/Register/pageNotFound/404page";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import Menu from "./Components/Menu/Menu";

const RootStyleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location. pathname=== "/Sign_up") {
      document.documentElement.style.setProperty("--root-height", "100vh");
    } else {
      document.documentElement.style.setProperty("--root-height", "unset");
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

function App() {
  const [user, setuser] = useState();
  const setUser = (User: any) => {
    setuser(User);
  };
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
