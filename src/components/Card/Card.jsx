import React from "react";

import MyLoader from "../loader/Loader";
import AppContext from "../context";

import "./Card.scss";
import { useLocation } from "react-router-dom";

const Card = ({
  name,
  price,
  count,
  imageUrl,
  id,
  onClickPlus,
  onRemoveFav,
  onClickFavourite,
  loading = false,
}) => {
  const { isCardsAdded, isFavouriteAdded } = React.useContext(AppContext);
  const cardsObj = { name, price, imageUrl, count, parentId: id, id };
  const location = useLocation()

  const handlePlus = () => {
    onClickPlus(cardsObj);
  };

  const onFavourite = () => {
    onClickFavourite(cardsObj);
  };


  return (
    <div className="card">
      {loading ? (
        <MyLoader />
      ) : (
        <>
          {onClickFavourite ? (
    <div>
              {location.pathname !== '/favourites' ? <div className="card-favourite" onClick={onFavourite}>
              <img
                src={ isFavouriteAdded(id) ? "/img/liked.svg" : "/img/noliked.svg"}
                alt="noliked"
              />
            </div> : <div className="card-favourite" onClick={() => onRemoveFav(id)}>
              <img
                src='/img/btn-remove.svg'
                alt="noliked"
              />
            </div>}
    </div>
          ) : null}
          <img className="card-gameconsole" src={imageUrl} alt="sony" />
          <h5>{name}</h5>
          <div className="card-bottom">
            <div className="card-price">
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            {onClickPlus ? (
              <img
                className="card-plus"
                onClick={handlePlus}
                src={
                  isCardsAdded(id) ? "/img/btn-checked.svg" : "/img/btn-add.svg"
                }
                alt="add"
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
