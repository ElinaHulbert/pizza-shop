import React from "react";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://62f0eef1e2bca93cd240319f.mockapi.io/items?category=" + categoryId
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort sortType={sortType} onChangeSort={(id) => setSortType(id)} />
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
  );
}
