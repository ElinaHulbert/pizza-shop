//Компания, где производят пирог. Компания принимает инструкции со склада и посылает ее на кухню.
import React from "react";
import Pagination from "../pagination";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";

export default function Home() {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  ); //we don't need the whole state, just getting the part we want
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: "popularity",
  //   sortProperty: "rating",
  // });
  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id)); //imported action above and dispatched it to store
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number)); //imported action above and dispatched it to store
  };
  React.useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    console.log("currentPage", currentPage);
    if (currentPage === undefined) {
      axios
        .get(
          `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=1&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0);
    } else {
      axios
        .get(
          `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0);
    }

    setIsLoading(true);
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
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">All products</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
}
