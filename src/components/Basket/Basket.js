import React from "react";
import AppContext from "../context";
import axios from "axios";
import Info from "../Info";
import './Basket.scss';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const Basket = ({cards = [], onClose, onRemove, opened}) => {
    const {basketCards, setBasketCards} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderCompelete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = basketCards.reduce((sum, obj) => obj.price + sum, 0);


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://6397f57f86d04c7633a1987c.mockapi.io/orders', {
                cards: basketCards,
            });
            setOrderId(data.id);
            setIsOrderCompelete(true);
            setBasketCards([]);

            for (let i = 0; i < basketCards.length; i++) {
                const card = basketCards[i];
                await axios.delete('https://6397f57f86d04c7633a1987c.mockapi.io/orders' + card.id)
                await delay();  
            }
        } catch (error) {
            alert("Ошибка")
        }
        setIsLoading(false);
    }
    return (
        <div className={opened ? "overlayVisible" : "overlay"}>
            <div className="basket-block">
            <h2>Корзина <img className="basket-remove" onClick={onClose} src="/img/btn-remove.svg" alt="close"/></h2>

            {
                cards.length > 0 ? (
                    <>
                    <div className="items">
                {
                    cards.map(item => (
                        <div key={item.id} className="basket-item">
                        <img className="basket-sneakers" src={item.imageUrl} alt="sneakers"/>
                        <div className="basket-item-price">
                            <p>{item.name}</p>
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
                <b>{totalPrice} руб</b>
            </li>
            </ul>
            <button disabled={isLoading} onClick={onClickOrder} className="basket-ul-button">
            Оформить Заказ
            <img src="/img/arrow.svg" alt="arrow"/>
            </button>
            </div>
                    </>
                ) : (
                    <Info
                    title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской службе` : "Добавьте хотя бы один заказ"}
                    image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}/>
            )}

        </div>
    </div>
    )
}

export default Basket;