import styled, { keyframes } from "styled-components";

const Loading = () => {
  return <Spinner />;
};

const rotate = keyframes`
     to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  width: 6rem;
  height: 6rem;
  margin: 0 auto;
  margin-top: 40vh;
  border-radius: 50%;
  border: 3px solid var(--grey);
  border-top-color: var(--purple);
  animation: ${rotate} 0.6s linear infinite;
`;

export default Loading;
