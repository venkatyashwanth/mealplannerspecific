import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

// const details = {
//   date: 1660723752,
//   slot: 1,
//   position: 0,
//   type: "INGREDIENTS",
//   value: {
//     ingredients: [
//       {
//         name: "1kg chicken",
//       },
//     ],
//   },
// };

const ProfileInformation = () => {
  const params = useParams();
  const navigate = useNavigate();

  const createMealPlan = (foodInfo) => {
    const details = {
      date: foodInfo.date,
      slot: foodInfo.slot,
      position: 0,
      type: foodInfo.type,
      value: {
        ingredients: [
          {
            name: "1kg chicken",
          },
        ],
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

  const getMealPlanForUser = () => {
    const localInfo = JSON.parse(localStorage.getItem("profileData"));
    const arr = localInfo.filter((info) => info.user === params.username);
    const userName = arr[0].username;
    const hash = arr[0].hash;

    const url = `https://api.spoonacular.com/mealplanner/${userName}/day/2022-08-18?hash=${hash}&apiKey=${process.env.REACT_APP_API_KEY}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  const navigateToProfiles = () => {
    navigate("/profilesPage");
  };

  const getStoredData = () => {
    const localInfo = JSON.parse(localStorage.getItem("profileData"));
    console.log(localInfo);
    console.log(params.username);

    const arr = localInfo.filter((info) => info.user === params.username);
    console.log(arr[0].username);
    console.log(arr[0].hash);
  };

  const [foodInfo, setFoodInfo] = useState({
    date: "",
    slot: "",
    type: "",
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

  return (
    <>
      <h1>This is the profile of {params.username} </h1>
      <button onClick={createMealPlan}>Add Meal</button>
      <button onClick={getMealPlanForUser}>Get Data</button>
      <button onClick={navigateToProfiles}>Profiles</button>
      <button onClick={getStoredData}>Development</button>

      <div>
        {/* Form for getting meal data */}
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
            <label htmlFor="type">Choose type:</label>
            <select name="type" id="type" onChange={handleInfo}>
              <option value="RECIPE" name="type">
                RECIPE
              </option>
              <option value="PRODUCT" name="type">
                Product
              </option>
              <option value="INGREDIENTS" name="type">
                Ingredient
              </option>
            </select>
          </div>
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
};

export default ProfileInformation;
