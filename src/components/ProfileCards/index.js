import { useNavigate } from "react-router-dom"
import styled from "styled-components";

const ProfileContainer = styled.button`
  width: 120px;
  height: 120px;
  border: 1px solid black;
  margin: 10px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const ProfileContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const ProfileCards = (props) => {
    const navigate = useNavigate();
  const { data } = props;
  const { user } = data;
  const initial = user[0].toUpperCase();
  const username = user.charAt(0).toUpperCase() + user.slice(1);

    const doSome = () => {
        navigate(`/profileInformation/${user}`)
    }

  return (
    <ProfileContainer onClick={doSome}>
      <ProfileContent>
        <h1>{initial}</h1>
        <p>{username}</p>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileCards;
