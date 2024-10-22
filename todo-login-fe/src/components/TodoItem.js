import styled from "@emotion/styled";
import { Button, Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";
import React from "react";

const TodoItemContainer = styled(Grid2)(() => ({
  padding: "10px 0",
  borderBottom: "3px dashed #e0736888",
  display: "flex",
  alignItems: "center",
}));

const ButtonWrapper = styled("div")(() => ({
  display: "flex",
  gap: "5px",
}));

const ButtonDelete = styled(Button)(() => ({
  border: "none",
  boxShadow: "#e07368 1px 1px 3px",
  color: "salmon",
  "&:hover": { backgroundColor: "#e07368", color: "#fff" },
  "@media(max-width: 900px)": {
    minWidth: "50px",
  },
}));

const ButtonDone = styled(Button)(() => ({
  border: "none",
  boxShadow: "#87c5f9 1px 1px 3px",
  color: "#87c5f9",
  "&:hover": { backgroundColor: "#87c5f9", color: "#fff" },
  "@media(max-width: 900px)": {
    minWidth: "50px",
  },
}));

const ButtonUndone = styled(Button)(() => ({
  border: "none",
  boxShadow: "#7cc1b0 1px 1px 3px",
  backgroundColor: "#7cc1b0",
  color: "#fff",
  fontSize: "0.6rem",
  padding: "0.4rem",
  transition: "0.2s transform",
  "&:hover": { transform: "translateY(-3px)" },
  "@media(max-width: 900px)": {
    minWidth: "50px",
  },
}));

const TodoTask = styled("p")(({ isComplete }) => ({
  fontFamily: "'Dongle', sans-serif",
  fontSize: "1.8rem",
  margin: "10px 0",
  lineHeight: "1em",
  color: isComplete ? "#ddd" : "#555",
  textDecoration: isComplete ? "line-through" : "none",
  "@media(max-width: 900px)": {
    fontSize: "1.5rem",
  },
}));

const TodoItem = ({ item, idx, deleteItem, toggleComplete }) => {
  return (
    <TodoItemContainer container spacing={2} key={idx}>
      <Grid2 size={"grow"}>
        <TodoTask isComplete={item.isComplete}>{item.task}</TodoTask>
      </Grid2>
      <Grid2>
        <ButtonWrapper>
          <ButtonDelete onClick={() => deleteItem(item._id)} variant="outlined">
            <DeleteIcon />
          </ButtonDelete>
          {item.isComplete ? (
            <ButtonUndone
              onClick={() => toggleComplete(item._id)}
              variant="outlined"
            >
              <UndoIcon />
            </ButtonUndone>
          ) : (
            <ButtonDone
              onClick={() => toggleComplete(item._id)}
              variant="outlined"
            >
              <CheckIcon />
            </ButtonDone>
          )}
        </ButtonWrapper>
      </Grid2>
    </TodoItemContainer>
  );
};

export default TodoItem;
