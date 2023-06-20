import React from "react";

import MyLoader from "../loader/Loader";
import AppContext from "../context";

import "./Card.scss";

const Card = ({
  name,
  price,
  count,
  imageUrl,
  id,
  onClickPlus,
  onClickFavourite,
  favourite = false,
  added,
  loading = false,
}) => {
  const { isCardsAdded } = React.useContext(AppContext);
  const [isFavourite, setIsFavourite] = React.useState(favourite);
  const cardsObj = { name, price, imageUrl, count, parentId: id, id };

  const handlePlus = () => {
    onClickPlus(cardsObj);
  };

  const onFavourite = () => {
    onClickFavourite(cardsObj);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="card">
      {loading ? (
        <MyLoader />
      ) : (
        <>
          {onClickFavourite ? (
            <div className="card-favourite" onClick={onFavourite}>
              <img
                src={added ? "/img/liked.svg" : "/img/noliked.svg"}
                alt="noliked"
              />
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
