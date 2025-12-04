import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-dvh">

    <StyledWrapper  className="scale-75 ">
      <div className="loader">
        <div className="inner_loader" />
      </div>
    </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 200px;
    height: 10px;
    background: #004643;
    border-radius: 50px;
    overflow: hidden;
  }

  .inner_loader {
    width: 60%;
    height: 100%;
    background: #f9bc60;
    border-radius: 50px;
    animation: moveLeftRight 3s ease-in-out infinite;
  }

  @keyframes moveLeftRight {
    0% {
      transform: translateX(calc(-100% + 10px));
    }

    50% {
      transform: translateX(calc(200px - 10px));
    }

    100% {
      transform: translateX(calc(-100% + 10px));
    }
  }
`;

export default Loader;
