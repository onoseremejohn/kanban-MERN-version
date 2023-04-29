import { useUserContext } from "../UserContext";
import styled from "styled-components";
const Alert = () => {
  const { alertText, alertType, showAlert } = useUserContext() || {};
  return (
    <Wrapper alert={alertType} showAlert={showAlert}>
      {alertText}
    </Wrapper>
  );
};

interface Props {
  alert?: "danger" | "success" | "";
  showAlert?: boolean;
}

const Wrapper = styled.div<Props>`
  background-color: ${({ alert }) =>
    alert === "danger" ? "#f8d7da" : alert === "success" ? "green" : ""};
  color: ${({ alert }) =>
    alert === "danger" ? "#842029" : alert === "success" ? "white" : ""};
  border-color: transparent;
  border-radius: var(--radius);
  letter-spacing: 1px;
  margin-bottom: 1rem;
  min-height: 36px;
  padding: 0.375rem 0.75rem;
  text-align: center;
  visibility: ${({ showAlert }) => (showAlert ? "visible" : "hidden")};
`;

export default Alert;
