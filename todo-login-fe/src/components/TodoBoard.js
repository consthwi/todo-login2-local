import React from "react";
import TodoItem from "./TodoItem";
import styled from "@emotion/styled";
import boardSideImg from "../assets/board_side.png";
import TodoLottie from "./TodoLottie";

const TodoBoardContainer = styled("div")(() => ({
  backgroundColor: "#d6a96d",
  borderRadius: "1.5rem",
  padding: "1rem 0.5rem",
  margin: "30px 0",
  position: "relative",
  boxShadow: "#00000033 3px 3px 3px",
}));

const TodoBoardWrapper = styled("div")(() => ({
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1.5rem 1rem 1.5rem 2rem",
  boxShadow: "#00000033 3px 3px 3px",
}));

const TodoBoardSide = styled("div")(() => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "-5px",
  width: "30px",
  height: "70%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const BoardSideImg = styled("img")(() => ({
  width: "100%",
  margin: "10px 0",
}));

const TodoBoardTitle = styled("h2")(() => ({
  fontSize: "1.7rem",
  color: "salmon",
  margin: "10px 0",
}));

const TodoBoard = ({ todoList, toggleComplete, deleteItem }) => {
  return (
    <TodoBoardContainer>
      <TodoBoardSide>
        {todoList.length > 0
          ? Array(todoList.length * 2)
              .fill(null)
              .map((_, idx) => <BoardSideImg key={idx} src={boardSideImg} />)
          : Array(5)
              .fill(null)
              .map((_, idx) => <BoardSideImg key={idx} src={boardSideImg} />)}
      </TodoBoardSide>
      <TodoBoardWrapper>
        <TodoBoardTitle>
          {todoList.length > 0 ? "Todo List" : "Write Your Todo!"}
        </TodoBoardTitle>
        {todoList.length > 0 ? (
          todoList.map((item, idx) => {
            return (
              <TodoItem
                item={item}
                key={idx}
                toggleComplete={toggleComplete}
                deleteItem={deleteItem}
              />
            );
          })
        ) : (
          <TodoLottie sectionHeight={"150px"} />
        )}
      </TodoBoardWrapper>
    </TodoBoardContainer>
  );
};

export default TodoBoard;
