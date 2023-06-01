import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useRef } from "react";
const Prompt = () => {
  document.title = "View Task";
  const { userId, taskId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = inputRef.current?.value;
    if (!email) return;
    navigate(
      `/task/${userId}/${taskId}/view?email=${encodeURIComponent(email)}`
    );
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input type="email" id="email" name="email" required ref={inputRef} />
        <button type="submit">View task</button>
      </Form>
    </>
  );
};

const Form = styled.form`
  margin: 0 auto;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  input[type="email"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  button[type="submit"] {
    display: block;
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default Prompt;
