import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./scss/layouts/MainLayout";
//useSelector takes out the data from storage, like useContext
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";

// import pizzas from "./assets/pizzas.json";
import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
