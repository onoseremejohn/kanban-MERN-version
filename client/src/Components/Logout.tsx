import { FaPowerOff } from "react-icons/fa";
import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { logoutUser = () => {} } = useUserContext() || {};
  const navigate = useNavigate();
  const handleClick = () => {
    logoutUser();
    navigate("/landing");
  };
  return (
    <button
      type="button"
      style={{
        marginTop: "0.25em",
        display: "block",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      onClick={handleClick}
    >
      LOGOUT {<FaPowerOff />}{" "}
    </button>
  );
};

export default Logout;
