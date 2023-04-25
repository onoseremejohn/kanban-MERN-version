import { useUserContext } from "../UserContext";
import { Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import { LogoDark, LogoLight } from "../assets/Icons";
import task from "../assets/task.jpg";
import { useGlobalContext } from "../AppContext";
const Landing = () => {
  const { user } = useUserContext() || {};
  const { theme } = useGlobalContext() || {};
  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>{theme === "light" ? <LogoDark /> : <LogoLight />}</nav>
        <div className="page">
          {/* info */}
          <div className="info">
            <h1>
              Kanban <span>Task Manager</span> app
            </h1>
            <p>
              Easily create, edit, delete boards and tasks, and switch between
              boards with sidebar navigation. With its sleek and intuitive
              interface, it’s never been easier to stay on top of your to-do
              list and keep your projects organized
            </p>
            <Link to="/register" className="register btn">
              Login/Register
            </Link>
          </div>
          <img src={task} alt="task manager" className="main-img" />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  nav {
    width: 90vw;
    max-width: var(--maxWidth);
    margin: 0 auto;
    height: 5rem;
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - 5rem);
    display: grid;
    align-items: center;
    width: 90vw;
    max-width: var(--maxWidth);
    margin: 0 auto;
    /* margin-top: -3rem; */
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--purple);
    }
  }
  p {
    color: var(--grey);
    font-size: medium;
  }
  .main-img {
    display: none;
  }
  .register {
    background-color: ${({ theme }) => theme.borderLine};
    margin-top: 1em;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
