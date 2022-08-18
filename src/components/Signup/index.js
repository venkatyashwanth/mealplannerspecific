import { useState } from "react";
import { useNavigate } from "react-router-dom";
import addDetails from "../../config/MyService";

const Signup = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleDetails = (event) => {
    let { name, value } = event.target;
    setUserDetails({...userDetails,[name]:value})
  };

  const postUserDetails = (event) => {
    event.preventDefault();
    let localData = JSON.parse(localStorage.getItem("profileData"));
    if(localData !== null){
      function checkUser(data){
        return data.user === userDetails.username
      }
      if(localData.some(checkUser)){
        alert('Profile exist with given username')
        return 
      }
    }
    addDetails(userDetails)
    alert('Profile is created')
    navigate("/profilesPage")
  };

  const navigateToHome = () => {
    navigate("/")
  }

  return (
    <>
      <form onSubmit={postUserDetails}>
        <div>
          <label htmlFor="userName">Enter username: </label>
          <input
            type="text"
            id="userName"
            name="username"
            onChange={handleDetails}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">Enter firstName: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleDetails}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Enter lastName: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleDetails}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleDetails}
            required
          />
        </div>
        <input type="submit" value="Create Profile" />
      </form>
      <button onClick={navigateToHome}>Home Page</button>
    </>
  );
};

export default Signup;
