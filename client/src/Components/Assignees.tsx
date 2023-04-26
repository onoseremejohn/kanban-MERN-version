import styled from "styled-components";
import { TasksType } from "../types";
import { getInitials } from "../helpers";
type AssigneesProp = Pick<TasksType, "assignedTo">;
const Assignees = ({ assignedTo }: AssigneesProp) => {
  return (
    <>
      <h6>Assigned to : </h6>
      <Wrapper>
        {assignedTo.length === 0 && "none"}
        {assignedTo.map((person) => {
          const { name, email } = person;
          return <SinglePerson name={name} email={email} />;
        })}
      </Wrapper>
    </>
  );
};

interface Prop {
  name: string;
  email: string;
}

const SinglePerson = ({ name, email }: Prop) => {
  const initials = getInitials(name);
  return (
    <Person className="person-icon">
      <h4 style={{ color: "white", cursor: "default" }}>{initials}</h4>
      <span className="tooltip">
        {name} <br />
        {email.toLowerCase()}
      </span>
    </Person>
  );
};

const Person = styled.div``;

const Wrapper = styled.ul`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  .person-icon {
    width: 55px;
    height: 50px;
    background-color: var(--grey);
    border-radius: 50%;
    position: relative;
    display: grid;
    place-items: center;
    &:hover {
      .tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    .tooltip {
      visibility: hidden;
      opacity: 0;
      cursor: default;
      position: absolute;
      display: inline-block;
      top: -120%;
      left: 0;
      color: ${({ theme }) => theme.body};
      padding: 5px;
      border-radius: 6px;
      background-color: ${({ theme }) => theme.text};
      text-align: center;
      z-index: 1;
    }
  }
`;

export default Assignees;
