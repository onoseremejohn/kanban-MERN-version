import styled, { keyframes } from "styled-components";

const ButtonLoading = () => {
  return <Wrapper />;
};

const spin = keyframes`
    0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: transparent;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

export default ButtonLoading;
