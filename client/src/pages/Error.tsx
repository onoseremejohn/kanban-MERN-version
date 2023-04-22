import { Link } from "react-router-dom";
import { NotFound } from "../assets/Icons";
import styled from "styled-components";
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <NotFound />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  svg {
    max-width: 600px;
    display: block;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey);
    font-size: larger;
  }
  a {
    color: var(--purple);
    text-decoration: underline;
    text-transform: capitalize;
    font-size: large;
  }
`;

export default Error;
