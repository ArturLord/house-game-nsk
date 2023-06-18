import React from "react";
import AppContext from "./context";

export const Info = ({ title, description, image }) => {
  const { setBasketOpened } = React.useContext(AppContext);
  return (
    <div className="basket-empty">
      <img className="img-box" src={image} alt="empty" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setBasketOpened(false)} className="greenButton">
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
