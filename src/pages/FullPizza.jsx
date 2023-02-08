import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function FullPizza() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("id", id);
  const [pizza, setPizza] = React.useState();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62f0eef1e2bca93cd240319f.mockapi.io/items/" + id
        );
        setPizza(data);
        console.log(data);
      } catch (error) {
        console.log("Error when fetching individual pizza");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt=""></img>
      <h2>{pizza.title}</h2>
      <h4>SEK {pizza.price}</h4>
    </div>
  );
}

export default FullPizza;
