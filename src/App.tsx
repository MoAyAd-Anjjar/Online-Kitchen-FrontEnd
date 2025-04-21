import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Register/Login";
import Sign_up from "./Components/Register/Sign_up";
import PageNotFound from "./Components/Register/pageNotFound/404page";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import Menu from "./Components/Menu/Menu";
import Cart from "./Components/Cart/Cart";
import Forum from "./Components/Forum/Forum";
import { ToastContainer } from "react-toastify";
import Favorite from "./Components/Favorite/Favorite";
import PaymentForm from "./Components/Payment/PaymentForm";

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

// Separate AppContent component to handle navigation inside BrowserRouter
function AppContent() {
  const location = useLocation();
  const [UserInfo, setUserInfo] = useState<any>();
  const navigate = useNavigate(); // Now it's inside a Router

  useEffect(() => {
    const sessionData = sessionStorage.getItem("UserInfo");
    if (
      sessionData &&
      location.pathname !== "/" &&
      location.pathname !== "/Sign_up"
    ) {
      setUserInfo(JSON.parse(sessionData));
    } else  {
      sessionStorage.removeItem("UserInfo");
      setUserInfo(null);
      if (location.pathname === "/Sign_up" )
        return
      else
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <>
      <ToastContainer />
      <RootStyleUpdater />

      {/* Conditionally render Header */}
      {UserInfo && <Header />}

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
        <Route path="/Payment" element={<PaymentForm />} />


      </Routes>
    </>
  );
}

// The main App component now only contains the Router
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
