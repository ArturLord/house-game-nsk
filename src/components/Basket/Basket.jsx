import React from "react";
import axios from "axios";

import AppContext from "../context";
import Info from "../Info";

import "./Basket.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Basket = ({ cards = [], onClose, onRemove, opened }) => {
  const { basketCards, setBasketCards } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderCompelete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const totalPrice = basketCards.reduce((sum, obj) => obj.price * obj.count + sum, 0);

  const handleIncrement = (counterId) => {
    const newCount = basketCards.map((obj) => {
      if (obj.id === counterId  && obj.count < 10) {
        obj.count += 1;
      }
      return obj;
    });
    setBasketCards(newCount);
    console.log(newCount)
  };

  const handleDecrement = (counterId) => {
    const newCount = basketCards.filter((obj) => {
      if (obj.id === counterId && obj.count > 0) {
        obj.count -= 1;
      }
      return obj;
    });
    setBasketCards(newCount);
  };

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6397f57f86d04c7633a1987c.mockapi.io/orders",
        {
          cards: basketCards,
        }
      );
      setOrderId(data.id);
      setIsOrderCompelete(true);
      setBasketCards([]);

      for (let i = 0; i < basketCards.length; i++) {
        const card = basketCards[i];
        await axios.delete(`https://6397f57f86d04c7633a1987c.mockapi.io/basket/${card.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка");
    }
    setIsLoading(false);
  };
  return (
    <div className={opened ? "overlayVisible" : "overlay"}>
      <div className="basket-block">
        <h2>
          Корзина{" "}
          <img
            className="basket-remove"
            onClick={onClose}
            src="/img/btn-remove.svg"
            alt="close"
          />
        </h2>

        {cards.length > 0 ? (
          <>
            <div className="items">
              {cards.map((item) => (
                <div key={item.id} className="basket-item">
                  <img
                    className="basket-gameconsole"
                    src={item.imageUrl}
                    alt="sony"
                  />
                  <div className="basket-item-price">
                    <p>{item.name}</p>
                    <b>{item.price}</b>
                    <div className="counter-basket">
                      <img
                        onClick={() => handleDecrement(item.id)}
                        src="/img/minus.svg"
                        alt="minus"
                      />
                      <b>{item.count}</b>
                      <img
                        onClick={() => handleIncrement(item.id)}
                        src="/img/pluscount.svg"
                        alt="plus"
                      />
                    </div>
                  </div>
                  <img
                    onClick={() => onRemove(item.id)}
                    className="basket-remove"
                    src="/img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="basket-ul-block">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="basket-ul-button"
              >
                Оформить Заказ
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет обработан`
                : "Добавьте хотя бы один заказ"
            }
            image={
              isOrderComplete ? "/img/smile-order.svg" : "/img/empty-basket.png"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Basket;
