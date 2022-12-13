import React from "react";
import './Basket.scss';

const Basket = ({cards = [], onClose, onRemove}) => {
    return (
        <div className="overlay">
            <div className="basket-block">
            <h2>Корзина <img className="basket-remove" onClick={onClose} src="/img/btn-remove.svg" alt="close"/></h2>

            {
                cards.length > 0 ? (
                    <>
                    <div className="items">
                {
                    cards.map(item => (
                        <div className="basket-item">
                        <img className="basket-sneakers" src={item.imageUrl} alt="sneakers"/>
                        <div className="basket-item-price">
                            <p>{item.title}</p>
                            <b>{item.price}</b>
                        </div>
                        <img onClick={() => onRemove(item.id)} className="basket-remove" src="/img/btn-remove.svg" alt="remove"/>
                        </div>
                    ))
                }
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
                    </>
                ) : (
            
            <div className="basket-empty">
                <img className="img-box" src="/img/empty-cart.jpg" alt="empty"/>
                <h2>Корзина пустая</h2>
                <p>Добавьте хотя бы один заказ</p>
                <button onClick={onClose} className="greenButton">
                    <img src="/img/arrow.svg" alt="arrow"/>
                    Вернуться назад
                </button>
            </div>
            )}

        </div>
    </div>
    )
}

export default Basket;