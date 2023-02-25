//Компания, где производят пирог. Компания принимает инструкции со склада и посылает ее на кухню.
import React, { useEffect, useRef } from "react";

import Pagination from "../pagination";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

import qs from "qs";
import { useNavigate, Link } from "react-router-dom";
import { list } from "../components/Sort";
import { RootState } from "../redux/store";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter
  ); //we don't need the whole state, just getting the part we want
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id)); //imported action above and dispatched it to store
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page)); //imported action above and dispatched it to store
  };
  useEffect(() => {
    const getPizzas = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sortType.replace("-", "");
      const order = sortType.includes("-") ? "asc" : "desc";
      const search = searchValue ? `&search=${searchValue}` : "";

      try {
        // @ts-ignore
        dispatch(fetchPizzas({ category, sortBy, currentPage, order, search }));
      } catch (error) {
        console.log("Error: ", error);
      }

      window.scrollTo(0, 0);
    };
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      //checking if there was a first render. If isMounted.current is false, don't place in query paramethers
      const queryString = qs.stringify(
        {
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true }
      );
      navigate(`${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //Checking UTL parameters and saving in redux if there was a first render

  useEffect(() => {
    if (window.location.search) {
      let params = qs.parse(window.location.search.substring(1));
      if (params.currentPage !== undefined) {
        const sort = list.find(
          (obj) => obj.sortProperty === params.sortProperty
        );
        const currentPage = 1;
        dispatch(setFilters({ ...params, sort, currentPage }));
        isSearch.current = true; //parameters came from url
      }
    }
  }, []);

  //Fetch pizzas if there was a first render

  // React.useEffect(() => {
  //   if (!isSearch.current) {
  //     fetchData();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sortType, searchValue, currentPage]);

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

    .map((obj: any) => (
      <Link to={`/pizza/${obj.id}`} key={obj.id}>
        <PizzaBlock {...obj} />
        {/*// spread operator, sending the whole object instead of this: // title=
        {obj.title}
        // price={obj.price}
        // imageUrl={obj.imageUrl}
        // sizes={obj.sizes}
        // types={obj.types}*/}
      </Link>
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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>An error has occurred</h2>
          <p>We could not fetch items. Please, try later. </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
