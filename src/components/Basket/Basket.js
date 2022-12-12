import React from "react";
import './Basket.scss';

const Basket = () => {
    return (
        <div className="overlay">
            <div className="basket-block">
            <h2>Корзина <img className="basket-remove" src="/img/btn-remove.svg" alt="remove"/></h2>
            <div className="items">
            <div className="basket-item">
            <img className="basket-sneakers" src="/img/sneakers/1.jpg" alt="sneakers"/>
            <div className="basket-item-price">
                <p>Мужские кроссовки Nike Air Max 270</p>
                <b>12 999 руб</b>
            </div>
            <img className="basket-remove" src="/img/btn-remove.svg" alt="remove"/>
            </div>
            <div className="basket-item">
            <img className="basket-sneakers" src="/img/sneakers/2.jpg" alt="sneakers"/>
            <div className="basket-item-price">
                <p>Мужские кроссовки Nike Air Max 270</p>
                <b>12 999 руб</b>
            </div>
            <img className="basket-remove" src="/img/btn-remove.svg" alt="remove"/>
            </div>
            </div>
            <div className="basket-ul-block">
            <ul>
            <li>
                <span>Итого:</span>
                <div></div>
                <b>21 500 руб</b>
            </li>
            </ul>
            <button className="basket-ul-button">
            Оформить Заказ
            <img src="/img/arrow.svg" alt="arrow"/>
            </button>
            </div>
        </div>
    </div>
    )
}

export default Basket;