import React from "react";
import cartEmptyImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

// const cartEmptyImg = require("./logo.svg") as string;

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Your cart is empty <span>😕</span>
    </h2>
    <p>
      Probably, you haven't ordered any pizzas yet
      <br />
      To order a pizza navigate home
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link className="button button--black" to="/">
      <span>Back to home</span>
    </Link>
  </div>
);

