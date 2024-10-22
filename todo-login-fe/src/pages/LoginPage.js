import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import TodoContainer from "../components/common/TodoContainer";
import api from "../utils/api";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginContainer = styled("div")(() => ({
  padding: "2rem",
  width: "600px",
  backgroundColor: "#ffffff88",
  boxShadow: "#00000033 0px 0px 10px",
  "@media(max-width: 767px)": {
    width: "80%",
  },
}));

const LoginTitle = styled("h1")(() => ({
  marginTop: "0",
  textAlign: "center",
}));

const LoginInput = styled(Input)(() => ({
  fontFamily: `"Dongle", sans-serif`,
  fontSize: "1.7rem",
  "&::after": {
    borderBottom: "2px solid salmon",
  },
  "&::before": {
    borderBottom: "1px solid #ddd",
  },
  "&:hover::before": {
    borderBottom: "1px solid #e07368 !important",
  },
}));

const LoginLabel = styled(InputLabel)(() => ({
  fontFamily: `"Agdasima", sans-serif`,
  fontSize: "1.3rem",
  "&.Mui-focused": {
    color: "salmon",
  },
}));

const LoginButton = styled(Button)(() => ({
  fontSize: "1rem",
  width: "130px",
  color: "#fff",
  backgroundColor: "#e07368",
  "&:hover": { backgroundColor: "salmon", color: "#fff" },
  "@media(max-width: 510px)": {
    width: "100%",
  },
}));

const LoginRegisterButton = styled(LoginButton)(() => ({
  width: "130px",
  "@media(max-width: 510px)": {
    width: "100%",
  },
}));

const LoginButtonWrapper = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  gap: "10px",
  justifyContent: "space-between",
  "@media(max-width: 510px)": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LoginJoinWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "10px",
  fontSize: "1rem",
  color: "#888",
  "@media(max-width: 510px)": {
    width: "100%",
    alignItems: "center",
    marginTop: "10px",
  },
  "& a": {
    fontSize: "1rem",
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
  },
}));

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        setUser(res.data.user);
        sessionStorage.setItem("token", res.data.token);
        api.defaults.headers["authorization"] = "Bearer " + res.data.token;
        // handleLogin이 실행되면 (로그인하면)
        // axios api 기본설정의 header객체 속 authorization키의 값으로
        // "Bearer " + 요청결과값의 토큰을 넣는다.
        setError("");
        navigate("/");
      } else {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <TodoContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {error && <p>{error}</p>}
      <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <form onSubmit={handleLogin}>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <LoginLabel htmlFor="login-email-input">Email Address</LoginLabel>
            <LoginInput
              id="login-email-input"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              aria-describedby="login-email-helper-text"
              required
            />
            <FormHelperText
              id="login-email-helper-text"
              sx={{
                color: focusedField === "email" ? "salmon" : "#fff",
              }}
            >
              Enter a valid email address
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <LoginLabel htmlFor="login-password-input">Password</LoginLabel>
            <LoginInput
              type="password"
              id="login-password-input"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              aria-describedby="login-password-helper-text"
              required
            />
            <FormHelperText
              id="Login-password-helper-text"
              sx={{
                color: focusedField === "password" ? "salmon" : "#fff",
              }}
            >
              Choose a secure password
            </FormHelperText>
          </FormControl>

          <LoginButtonWrapper>
            <LoginButton type="submit">Enter</LoginButton>
            <LoginJoinWrapper>
              <span>If you don't have an account?</span>
              <LoginRegisterButton>
                <Link to="/register">Sign Up!</Link>
              </LoginRegisterButton>
            </LoginJoinWrapper>
          </LoginButtonWrapper>
        </form>
      </LoginContainer>
    </TodoContainer>
  );
};

export default LoginPage;
