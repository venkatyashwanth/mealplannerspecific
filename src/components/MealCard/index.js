import styled from "styled-components";

const MealInfo = styled.div`
  width: 150px;
  min-height: 100px;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;

const MealCard = (props) => {
  const { mealData,username } = props;

  let value = mealData.slot;

  let slot;
  switch (value) {
    case 1:
      slot = "BreakFast";
      break;
    case 2:
      slot = "Lunch";
      break;
    case 3:
      slot = "Dinner";
      break;
    default:
      slot = "some error";
  }

  
  const deleteMeal = () => {
    const localInfo = JSON.parse(localStorage.getItem("profileData"));
    const arr = localInfo.filter((info) => info.user === username);
    const userName = arr[0].username;
    const hash = arr[0].hash;

    const url = `https://api.spoonacular.com/mealplanner/${userName}/items/${mealData.id}?hash=${hash}&apiKey=${process.env.REACT_APP_API_KEY}`;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <MealInfo>
        <p>{slot}</p>
        <p>Title: {mealData.value.title}</p>
        <p>Servings: {mealData.value.servings}</p>
        <p>id: {mealData.id}</p>
        <button onClick={deleteMeal}>Delete</button>
      </MealInfo>
    </>
  );
};

export default MealCard;
