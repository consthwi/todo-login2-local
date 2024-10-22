import React, { useEffect, useState } from "react";
import { Button, Grid2, TextField } from "@mui/material";
import styled from "@emotion/styled";
import api from "../utils/api";
import TodoContainer from "../components/common/TodoContainer";
import TodoBoard from "../components/TodoBoard";
import { useNavigate } from "react-router-dom";

// style-component start

const TodoHeader = styled("div")(() => ({
  position: "relative",
}));

const TodoTitle = styled("h1")(() => ({
  fontSize: "2rem",
  color: "salmon",
  textAlign: "center",
}));

const TodoText = styled(Grid2)(() => ({}));

const TodoInput = styled(TextField)(() => ({
  color: "#8c7967",
  transition: "0.3s all",
  backgroundColor: "#ffffff11",
  borderRadius: "5px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#cccccc",
      zIndex: "-1",
    },
    "&:hover fieldset": {
      borderColor: "#e07368",
      background: "#ffffff88",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e07368",
      background: "#ffffff88",
    },
  },
}));

const TodoButton = styled(Button)(() => ({
  width: "100%",
  height: "100%",
  fontSize: "1rem",
  padding: "0.1rem",
  border: "none",
  color: "#fff",
  backgroundColor: "#e07368",
  "&:hover": { backgroundColor: "salmon", color: "#fff" },
  "@media(max-width:900px)": { fontSize: "0.8rem" },
}));

const LogoutButton = styled(Button)(() => ({
  color: "salmon",
  fontFamily: "Agdasima",
  fontSize: "1rem",
  fontWeight: "bold",
  position: "absolute",
  right: 0,
  top: 0,
  transition: "0.1s transform",
  "&:hover": {
    backgroundColor: "transparent",
    transform: "translateY(-3px)",
    color: "red",
  },
}));
// style-component end

const TodoPage = ({ setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const getTasks = async () => {
    const res = await api.get("/tasks");
    setTodoList(res.data.data);
  };

  const addTask = async () => {
    const res = await api.post("/tasks", {
      task: todoValue,
      isComplete: false,
    });
    if (res.status === 200) {
      console.log("todo추가 성공");
      setTodoValue("");
      getTasks();
    }
  };

  const toggleComplete = async (id) => {
    try {
      const targetTask = todoList.find((item) => {
        return item._id === id;
      });
      const res = await api.put(`/tasks/${id}`, {
        isComplete: !targetTask.isComplete,
      });
      if (res.status === 200) {
        console.log("todo갱신 성공");
        getTasks();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    if (res.status === 200) {
      console.log("todo제거 성공");
      getTasks();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TodoContainer>
      <TodoHeader>
        <TodoTitle>Todo-App</TodoTitle>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </TodoHeader>
      <TodoText container spacing={{ xs: 1, md: 2 }}>
        <Grid2 size={{ xs: 12, md: 10 }}>
          <TodoInput
            onChange={(e) => {
              setTodoValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            value={todoValue}
            placeholder="오늘은 무엇을 할까요?"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <TodoButton variant="contained" onClick={addTask}>
            Enter
          </TodoButton>
        </Grid2>
      </TodoText>
      <TodoBoard
        todoList={todoList}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
    </TodoContainer>
  );
};

export default TodoPage;
