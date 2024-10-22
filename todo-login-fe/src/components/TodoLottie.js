import React from "react";
import todoLottieData from "../assets/todoLottie.json";
import Lottie from "lottie-react";
import styled from "@emotion/styled";

const LottieWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const TodoLottie = ({ sectionHeight }) => {
  return (
    <LottieWrapper style={{ height: sectionHeight }}>
      <Lottie style={{ width: "200px" }} animationData={todoLottieData} />
    </LottieWrapper>
  );
};

export default TodoLottie;
