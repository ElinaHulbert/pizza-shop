import React from "react";
import Pagination from "../pagination";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";

export default function Home({ searchValue }) {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "popularity",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    setIsLoading(true);
    fetch(
      `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    // this filtration method is good for static pages
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })

    .map((obj) => (
      <PizzaBlock {...obj} key={obj.id} />
      // spread operator, sending the whole object instead of this:
      // title={obj.title}
      // price={obj.price}
      // imageUrl={obj.imageUrl}
      // sizes={obj.sizes}
      // types={obj.types}
    ));
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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
