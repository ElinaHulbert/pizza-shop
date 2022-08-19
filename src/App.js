import React from "react";
import { Routes, Route } from "react-router-dom";
//useSelector takes out the data from storage, like useContext
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/filterSlice"; //destructuring since there is no default in original file
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { store } from "./redux/store";

// import pizzas from "./assets/pizzas.json";
import "./scss/app.scss";

export const SearchContext = React.createContext("");
function App() {
  const [searchValue, setSearchValue] = React.useState("");
  console.log(searchValue);
  const count = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();
  return (
    <div className="wrapper">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
