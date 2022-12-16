import { React, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import BigLoaderChatGroup from "./components/BigLoaderChatGroup";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState, resetState } from './store/userSlice'
import ProtectRoute from "./components/ProtectRoute";


function App() {
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_BACK}/users`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch(setInitialState(res.data.data));
        if (location.pathname === "/login" || location.pathname === "/register") {
          navigate("/")
        }
      })
      .catch((err) => {
        dispatch(resetState())
        Cookies.remove('token')
        if (location.pathname !== "/login" || location.pathname !== "/register") {
          navigate("/login")
        }
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="App">
      {loader ? <BigLoaderChatGroup /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectRoute loader={loader} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
