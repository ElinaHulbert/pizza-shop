import React from "react";
// import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";
// import pizzas from "./assets/pizzas.json";
import "./scss/app.scss";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://62f0eef1e2bca93cd240319f.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories /> */}
            <Sort />
          </div>
          <h2 className="content__title">All products</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((obj) => (
                  <PizzaBlock {...obj} key={obj.id} />
                  // spread operator, sending the whole object instead of this:
                  // title={obj.title}
                  // price={obj.price}
                  // imageUrl={obj.imageUrl}
                  // sizes={obj.sizes}
                  // types={obj.types}
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
