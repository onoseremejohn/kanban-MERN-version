import styled from "styled-components";

const ViewTask = () => {
  console.log("hello world");
  console.log("hello world");
  console.log(window.task);
  return (
    <Wrapper>
      <h1>HELLO</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  color: #828fa3;
  position: relative;
  max-height: 80vh;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  overflow-x: hidden;
  label {
    display: flex;
    align-items: center;
    background-color: #f4f7fd;
    color: #000;
    border-radius: var(--radius);
    font-weight: 600;
    padding: 0.6em 1em;
    gap: 0.8em;
    margin-bottom: 0.5em;
    cursor: pointer;
    transition: color 0.1s linear, text-decoration 0.1s linear;
    &:hover {
      background-color: #635fc740;
    }
    /* p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    } */
  }
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
  }
  .description {
    font-size: 1rem;
    margin-bottom: 1.5em;
    color: var(--grey);
  }
  h4 {
    color: #000;
    margin-bottom: 0;
  }
  h6 {
    font-size: 0.75rem;
    margin-bottom: 0.5em;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 2px solid rgba(130, 143, 163, 0.4);
    padding: 0.5em 1em;
    border-radius: var(--radius);
    margin-bottom: 1em;
    color: #000;
    &:focus {
      border-color: #635fc7;
    }
  }
  .completed {
    font-weight: 400;
    text-decoration: line-through;
    color: gray;
  }
  .dates {
    display: flex;
    gap: 3.5em;
    margin-bottom: 1em;
    svg {
      position: absolute;
      top: 25%;
      right: -30%;
      color: red;
      font-size: 2rem;
      background-color: inherit;
    }
  }
`;

export default ViewTask;
