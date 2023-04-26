import styled from "styled-components";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoDark, LogoLight } from "../assets/Icons";
import { useUserContext } from "../UserContext";
import Alert from "../Components/Alert";
import { useGlobalContext } from "../AppContext";
import spin from "../assets/loading-loading-forever.gif";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const {
    displayAlert = () => {},
    setupUser = () => {},
    user,
    isLoading,
    signupSuccess,
  } = useUserContext() || {};
  const { theme } = useGlobalContext() || {};
  const navigate = useNavigate();
  const [action, setAction] = useState<"register" | "login">("login");
  const toggleAction = () => {
    setAction((a) => (a === "register" ? "login" : "register"));
    setValues({ ...values, isMember: !values.isMember });
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created Successfully!",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (signupSuccess) {
      toggleAction();
    }
  }, [user, signupSuccess]);

  return (
    <Wrapper signupSuccess={signupSuccess}>
      <form onSubmit={handleSubmit}>
        {theme === "light" ? <LogoDark /> : <LogoLight />}
        <h3 style={{ textAlign: "center", marginTop: "0.5em" }}>{action}</h3>
        <Alert />
        {action === "register" && (
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              value={values.name}
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>
        )}
        <>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              value={values.email}
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              value={values.password}
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className="submit" type="submit" disabled={isLoading}>
            {isLoading ? (
              <img className="spin" src={spin} alt="loading..." />
            ) : action === "login" ? (
              "Login"
            ) : (
              "Sign up"
            )}
          </button>
          <p>
            {action === "login" ? "Not a member yet?" : "Already a member?"}
            <button
              onClick={toggleAction}
              type="button"
              disabled={isLoading}
              className="action"
            >
              <p> {action === "login" ? "register" : "login"}</p>
            </button>
          </p>
        </>
      </form>
    </Wrapper>
  );
};

interface WrapperProps {
  signupSuccess?: boolean;
}

const Wrapper = styled.main<WrapperProps>`
  display: grid;
  place-content: center;
  min-height: 100vh;
  h3,
  p button {
    text-transform: capitalize;
  }
  svg {
    display: block;
    margin: 0 auto;
  }
  form {
    background-color: ${({ theme }) => theme.white};
    border-radius: var(--radius);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-top: 4px solid var(--purple);
    width: 90vw;
    max-width: 500px;
    padding: 2rem 2.5rem;
    transition: all 0.3s ease-in-out;
    transition: var(--transition);
    min-height: ${({ signupSuccess }) => (signupSuccess ? "50vh" : "")};
  }
  .form-control {
    margin-bottom: 1em;
    label {
      display: block;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
      font-size: large;
    }
  }
  p {
    font-size: large;
    margin-top: 0.5em;
  }
  button:disabled {
    opacity: 70%;
    cursor: not-allowed;
  }
  .submit {
    width: 100%;
    background-color: var(--purple);
    padding: 0.75em 0em;
    color: white;
    font-weight: 600;
    border-radius: 20px;
    &:hover {
      background-color: #a8a4ff;
    }
  }

  input {
    width: 100%;
    color: inherit;
    background-color: inherit;
    height: 3em;
    padding: 0.5em 1em;
    border-radius: var(--radius);
    outline: none;
    border: 2px solid #828fa366;
    &:focus-visible {
      border-color: var(--purple);
    }
  }
  .action {
    margin-left: 1em;
    color: var(--purple);
  }
`;

export default Register;
