import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import PrivateRoute from "./route/PrivateRoute";

function App() {
  const [user, setUser] = useState(null);

  // const getUser = () => {
  //   try {
  //   } catch (error) {}
  // };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      {/* <Route path="/" element={<TodoPage />} /> */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
