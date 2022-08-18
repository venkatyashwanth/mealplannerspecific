import axios from "axios";

const addDetails = async (details) => {
  const user = details.username;

  let localData = (() => {
    const localValue = localStorage.getItem("profileData");
    return localValue === null ? [] : JSON.parse(localValue);
  })();

  const url = `https://api.spoonacular.com/users/connect?apiKey=${process.env.REACT_APP_API_KEY}`;
  const options = {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios.post(url, { options }).then((res) => {
    localData.push({user,...res.data});
    console.log(localData);
    localStorage.setItem("profileData", JSON.stringify(localData));
  });
};

export default addDetails;
