import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faCube,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import defaultURL from "../Data/image";

function Nav({ currentUser, updateUser }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => updateUser());
    updateUser(null);
  };

  console.log(defaultURL);

  return (
    <Container>
      <Items>
        <Link to={"/"} className="nav-logo" style={{ color: "white  " }}>
          <FontAwesomeIcon icon={faCube} />
        </Link>
      </Items>
      {!currentUser ? (
        <Items>
          <Link to={"/"} className="nav-home" style={{ color: "white  " }}>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </Items>
      ) : (
        <Items>
          <Link
            to={"/welcome"}
            className="nav-my-account"
            style={{ color: "white  " }}>
            {currentUser.picture ? (
              <ReactRoundedImage
                image={currentUser.picture}
                roundedSize="0"
                imageWidth="40"
                imageHeight="40"
              />
            ) : (
              <ReactRoundedImage
                image={defaultURL}
                roundedSize="0"
                imageWidth="40"
                imageHeight="40"
              />
            )}
          </Link>
        </Items>
      )}
      {!currentUser ? (
        <Items>
          <Link
            to={"/login"}
            className="nav-login"
            style={{ color: "white  " }}>
            <FontAwesomeIcon icon={faRightToBracket} />
          </Link>
        </Items>
      ) : (
        <Items onClick={handleLogOut}>
          <Link to={"/"} className="nav-about" style={{ color: "white  " }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        </Items>
      )}
    </Container>
  );
}

const Container = styled.div`
  background: transparent;
  position: fixed;
  z-index: 1;
  transition: 0.5s ease;
  margin-top: 2rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    margin-top: 1rem;
    margin-left: 1rem;
  }
`;

const Items = styled.div`
  font-size: 2rem;
  padding: 20px;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    padding: 15px;
    font-size: 1.5rem;
  }
`;

export default Nav;
