import React from "react";
import { Link } from "react-router-dom";

import AppContext from "../context";

import "./Header.scss";

const Header = ({ onClickBasket }) => {
  const { basketCards } = React.useContext(AppContext);
  const totalPrice = basketCards.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <div className="header">
      <Link to="/">
        <div className="headerLeft">
          <img src="/img/logo.png" alt="logo" />
          <div>
            <h3>House Game Nsk</h3>
            <p>Магазин игровых приставок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={onClickBasket}>
          <img src="/img/basket.svg" alt="cart" />
          <span>{totalPrice} руб</span>
        </li>
        <li>
          <Link to="/favourites">
            <img src="/img/star.svg" alt="star" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="/img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
