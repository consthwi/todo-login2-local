import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    // 토큰을 통해 유저정보를 가져온다.
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        // api.defaults.headers["authorization"] = "Bearer "+storedToken
        // => api.js에서 초기세팅 대체
        const res = await api.get("/user/me");
        // console.log("rrr", res);
        setUser(res.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser(); // 웹사이트 시작하자마자 권한 체크
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage setUser={setUser} />
          </PrivateRoute>
        }
      />
      {/* <Route path="/" element={<TodoPage />} /> */}
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
