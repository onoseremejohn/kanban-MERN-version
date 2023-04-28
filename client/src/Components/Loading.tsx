import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Loader>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </Loader>
  );
};

const spin = keyframes`
   0% {
    transform: scale(1) rotate(0);
  }

  20%, 25% {
    transform: scale(1.3) rotate(90deg);
  }

  45%, 50% {
    transform: scale(1) rotate(180deg);
  }

  70%, 75% {
    transform: scale(1.3) rotate(270deg);
  }

  95%, 100% {
    transform: scale(1) rotate(360deg);
  }
`;

const Loader = styled.div`
  --dim: 3rem;
  width: var(--dim);
  height: var(--dim);
  position: absolute;
  animation: ${spin} 2s linear infinite;
  top: 45vh;
  left: 45%;
  .circle {
    --dim: 1.2rem;
    width: var(--dim);
    height: var(--dim);
    background-color: var(--purple);
    border-radius: 50%;
    position: absolute;
  }
  .circle:nth-child(1) {
    top: 0;
    left: 0;
  }
  .circle:nth-child(2) {
    top: 0;
    right: 0;
  }
  .circle:nth-child(3) {
    bottom: 0;
    left: 0;
  }
  .circle:nth-child(4) {
    bottom: 0;
    right: 0;
  }
`;

export default Loading;
