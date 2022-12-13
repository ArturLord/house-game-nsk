import React from "react";
import './Header.scss';

const Header = ({onClickBasket}) => {
    return (
        <header>
        <div className="headerLeft">
          <img src='/img/logo.png' alt="logo"/>
          <div>
            <h3>House Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="headerRight">
          <li onClick={onClickBasket}>
          <img src='/img/cart.svg' alt="cart"/>
            <span>1200 руб</span>
          </li>
          <li>
          <img src='/img/user.svg' alt="user"/>
          </li>
        </ul>
      </header>
    )
}

export default Header;