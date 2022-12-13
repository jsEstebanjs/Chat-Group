import { React, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import BigLoaderChatGroup from "./components/BigLoaderChatGroup";

function App() {
  const [loader, setLoader] = useState(true)
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_HEROKU_URL}/users`, {
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get("token")}`,
  //       },
  //     })
  //   // .then((res) => {
  //   //   dispatch(SetUserInfo(res.data.data));
  //   // })
  //   // .catch((err) => {
  //   //   localStorage.clear();
  //   // })
  //   // .finally(() => {
  //   //   setLoader(false);
  //   // });
  // }, []);

  return (
    <div className="App">
      {loader ? <BigLoaderChatGroup /> : null}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
