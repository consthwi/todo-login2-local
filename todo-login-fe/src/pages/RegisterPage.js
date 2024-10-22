import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TodoContainer from "../components/common/TodoContainer";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const RegisterContainer = styled("div")(() => ({
  padding: "2rem",
  width: "600px",
  backgroundColor: "#ffffff88",
  boxShadow: "#00000033 0px 0px 10px",
  "@media(max-width: 767px)": {
    width: "80%",
  },
}));

const RegisterTitle = styled("h1")(() => ({
  marginTop: "0",
  textAlign: "center",
}));

const RegisterInput = styled(Input)(() => ({
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

const RegisterLabel = styled(InputLabel)(() => ({
  fontFamily: `"Agdasima", sans-serif`,
  fontSize: "1.3rem",
  "&.Mui-focused": {
    color: "salmon",
  },
}));

const RegisterButton = styled(Button)(() => ({
  fontSize: "1rem",
  width: "200px",
  color: "#fff",
  backgroundColor: "#e07368",
  "&:hover": { backgroundColor: "salmon", color: "#fff" },
  "@media(max-width: 510px)": {
    width: "100%",
  },
}));

const RegisterLoginButton = styled(RegisterButton)(() => ({
  width: "100px",
  "@media(max-width: 510px)": {
    width: "100%",
  },
}));

const RegisterButtonWrapper = styled("div")(() => ({
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

const RegisterJoinWrapper = styled("div")(() => ({
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

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("패스워드가 일치하지 않습니다");
      }
      const res = await api.post("/user", {
        name: name,
        email: email,
        password: password,
      });
      if (res.status === 200) {
        navigate("/login");
      } else {
        throw new Error(res.data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    console.log("error state:", error);
  }, [error]);

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
      <RegisterContainer>
        <RegisterTitle>Register</RegisterTitle>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <RegisterLabel htmlFor="register-name-input">Name</RegisterLabel>
            <RegisterInput
              id="register-name-input"
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField("")}
              aria-describedby="register-name-helper-text"
              required
            />
            <FormHelperText
              id="register-name-helper-text"
              sx={{
                color: focusedField === "name" ? "salmon" : "#fff",
              }}
            >
              Please enter your full name
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <RegisterLabel htmlFor="register-email-input">
              Email Address
            </RegisterLabel>
            <RegisterInput
              id="register-email-input"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              aria-describedby="register-email-helper-text"
              required
            />
            <FormHelperText
              id="register-email-helper-text"
              sx={{
                color: focusedField === "email" ? "salmon" : "#fff",
              }}
            >
              Enter a valid email address
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <RegisterLabel htmlFor="register-password-input">
              Password
            </RegisterLabel>
            <RegisterInput
              type="password"
              id="register-password-input"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              aria-describedby="register-password-helper-text"
              required
            />
            <FormHelperText
              id="register-password-helper-text"
              sx={{
                color: focusedField === "password" ? "salmon" : "#fff",
              }}
            >
              Choose a secure password
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <RegisterLabel htmlFor="register-confirm-password-input">
              Confirm Password
            </RegisterLabel>
            <RegisterInput
              type="password"
              id="register-confirm-password-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField("")}
              aria-describedby="register-confirm-password-helper-text"
              required
            />
            <FormHelperText
              id="register-confirm-password-helper-text"
              sx={{
                color: focusedField === "confirmPassword" ? "salmon" : "#fff",
              }}
            >
              Re-enter your password
            </FormHelperText>
          </FormControl>

          <RegisterButtonWrapper>
            <RegisterButton type="submit">Join Account</RegisterButton>
            <RegisterJoinWrapper>
              <span>Do you already have an account?</span>
              <RegisterLoginButton>
                <Link to="/login">Login!</Link>
              </RegisterLoginButton>
            </RegisterJoinWrapper>
          </RegisterButtonWrapper>
        </form>
      </RegisterContainer>
    </TodoContainer>
  );
};

export default RegisterPage;
