import React, {Suspense} from "react";
import Loadable from "react-loadable";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./scss/layouts/MainLayout";
import Home from "./pages/Home";
import "./scss/app.scss";

const Cart = Loadable({
  loader: () => import("./pages/Cart"),
  loading: () => <div>Loading...</div>,
})
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./pages/NotFound'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/'./pages/FullPizza'));


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<Suspense fallback={<div>Loading...</div>}><FullPizza /></Suspense>} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
