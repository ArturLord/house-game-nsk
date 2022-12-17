import React from "react";
import AppContext from "../context";
import { Link } from "react-router-dom";
import './Header.scss';

const Header = ({onClickBasket}) => {
  const {basketCards} = React.useContext(AppContext);
  const totalPrice = basketCards.reduce((sum, obj) => obj.price + sum, 0);
    return (
        <header>
        <Link to="/">
        <div className="headerLeft">
          <img src='/img/logo.png' alt="logo"/>
          <div>
            <h3>House Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        </Link>
        <ul className="headerRight">
          <li onClick={onClickBasket}>
          <img src='/img/cart.svg' alt="cart"/>
            <span>{totalPrice} руб</span>
          </li>
          <li>
          <Link to="/favourites">
          <img src='/img/heart.svg' alt="heart"/>
          </Link>
          </li>
          <li>
          <Link to="/orders">
          <img src='/img/user.svg' alt="user"/>
          </Link>
          </li>
        </ul>
      </header>
    )
}

export default Header;