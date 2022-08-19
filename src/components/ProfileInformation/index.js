import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import MealCard from "../MealCard";

const ProfileInformation = () => {
  const params = useParams();
  const navigate = useNavigate();

  const createMealPlan = (foodInfo) => {
    const details = {
      date: foodInfo.date,
      slot: foodInfo.slot,
      position: 0,
      type: "RECIPE",
      value: {
        id: 296213,
        servings: foodInfo.serving,
        title: foodInfo.title,
        imageType: "jpg",
      },
    };
    console.log(details);
    const localInfo = JSON.parse(localStorage.getItem("profileData"));
    const arr = localInfo.filter((info) => info.user === params.username);
    const userName = arr[0].username;
    const hash = arr[0].hash;

    const url = `https://api.spoonacular.com/mealplanner/${userName}/items?apiKey=${process.env.REACT_APP_API_KEY}&hash=${hash}`;

    const options = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // Displaying the User Data Got From API

  const [userData, setUserData] = useState([]);

  const getMealPlanForUser = (infoDate) => {
    const localInfo = JSON.parse(localStorage.getItem("profileData"));
    const arr = localInfo.filter((info) => info.user === params.username);
    const userName = arr[0].username;
    const hash = arr[0].hash;

    const url = `https://api.spoonacular.com/mealplanner/${userName}/day/${infoDate.schDate}?hash=${hash}&apiKey=${process.env.REACT_APP_API_KEY}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setUserData(data.items))
      .catch((e) => console.log(e));
  };

  const navigateToProfiles = () => {
    navigate("/profilesPage");
  };

  const getStoredData = () => {
    const localInfo = JSON.parse(localStorage.getItem("profileData"));
    // console.log(localInfo);
    // console.log(params.username);

    const arr = localInfo.filter((info) => info.user === params.username);
    // console.log(arr[0].username);
    // console.log(arr[0].hash);

    console.log(userData);
  };

  const [foodInfo, setFoodInfo] = useState({
    date: "",
    slot: "",
    title: "",
    serving: "",
  });

  const handleInfo = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
    if (name === "date") {
      let datum = Date.parse(value);
      value = datum / 1000;
    }
    setFoodInfo({ ...foodInfo, [name]: value });
  };

  const handleData = (event) => {
    event.preventDefault();
    createMealPlan(foodInfo);
  };

  const [infoDate, setInfoDate] = useState({
    schDate: "",
  });

  const getScheduledDate = (event) => {
    let { name, value } = event.target;
    setInfoDate({ ...infoDate, [name]: value });
  };

  const handleDateInfo = (event) => {
    event.preventDefault();
    getMealPlanForUser(infoDate);
  };

  return (
    <>
      <h1>This is the profile of {params.username} </h1>

      <button onClick={navigateToProfiles}>Profiles</button>
      <button onClick={getStoredData}>Development</button>

      <div>
        {/* Form for storing meal data - related to ingredients*/}
        <form onSubmit={handleData}>
          <h1>Add Your Meal Plan</h1>
          <div>
            <label htmlFor="dateInput">Enter Date: </label>
            <input type="date" name="date" onChange={handleInfo} />
          </div>
          <div>
            <label htmlFor="slot">Choose a slot:</label>
            <select name="slot" id="slot" onChange={handleInfo}>
              <option value="" name="slot">
                -
              </option>
              <option value="1" name="slot">
                BreakFast
              </option>
              <option value="2" name="slot">
                Lunch
              </option>
              <option value="3" name="slot">
                Dinner
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="title">Recipe title: </label>
            <input type="text" id="title" name="title" onChange={handleInfo} />
          </div>
          <div>
            <label htmlFor="servings">No.of Servings: </label>
            <input
              type="number"
              id="servings"
              name="serving"
              style={{ width: "50px" }}
              onChange={handleInfo}
            />
          </div>
          <input type="submit" value="Add Meal" />
        </form>
      </div>

      <div>
        {/* Form for  getting user specific info */}
        <form onSubmit={handleDateInfo}>
          <h1>Get Your Meal Plan</h1>
          <div>
            <label htmlFor="getDate">Enter Scheduled Date: </label>
            <input
              type="date"
              id="getDate"
              name="schDate"
              onChange={getScheduledDate}
            />
          </div>
          <input type="submit" value="Get Data" />
        </form>
      </div>

      <MealContainer>
        {userData.map((data) => (
          <MealCard key={data.id} mealData={data} username={params.username} />
        ))}
      </MealContainer>
    </>
  );
};


const MealContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default ProfileInformation;
