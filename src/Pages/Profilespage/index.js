import { useNavigate } from "react-router-dom";
import ProfileCards from "../../components/ProfileCards";

import styled from "styled-components";

const ProfileDiv = styled.div`
  display: flex;  
  flex-wrap: wrap;
  margin-top: 20px;
`;


const Profilespage = () => {
  const navigate = useNavigate();

  let localData = (() => {
    const localValue = localStorage.getItem("profileData");
    return localValue === null ? [] : JSON.parse(localValue);
  })();

  const renderProfileInfo = () => {
    return (
      <>
        {localData === [] ? (
          ""
        ) : (
          <ProfileDiv>
            {localData.map((data) => (
              <ProfileCards key={data.user} data={data}/>
            ))}
          </ProfileDiv>
        )}
      </>
    );
  };

  const navigateToCreateProfile = () => {
    navigate("/registerProfile");
  }

  return (
    <>
      <h1>All profiles</h1>
      <button onClick={navigateToCreateProfile}>Add New Profile</button>
      {/* <button onClick={createMealPlan}>Add Meal</button>
      <button onClick={getMealPlanForUser}>Get Data</button> */}
      {renderProfileInfo()}
    </>
  );
};

export default Profilespage;
