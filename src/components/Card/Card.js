import React from "react";
import MyLoader from "../loader/Loader";
import AppContext from "../context";
import './Card.scss';


const Card = ({
    name, 
    price, 
    imageUrl, 
    id,
    onClickPlus, 
    onClickFavourite, 
    favourite = false, 
    added = false,
    loading = false
}) => { 
    const {isCardsAdded} = React.useContext(AppContext);
    const [isFavourite, setIsFavourite] = React.useState(favourite);
    const cardsObj = {name, price, imageUrl, parentId: id, id}

    const HandlePlus = () => {
        onClickPlus(cardsObj);
    };

    const onFavourite = () => {
        onClickFavourite(cardsObj);
        setIsFavourite(!isFavourite);
    }
    
    return (
        <div className="card">
            {
                loading ? <MyLoader/> : 
                    <>
                    {onClickFavourite ?                             <div className="card-favourite" onClick={onFavourite}>
                <img src={isFavourite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked"/>
            </div> : null}
                <img className="card-sneakers" src={imageUrl} alt='sneakers'/>
                <h5>{name}</h5>
            <div className="card-bottom">
                <div className="card-price">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                {onClickPlus ?                     <img className="card-plus" onClick={HandlePlus} 
                    src={isCardsAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt='plus'/> : null}
            </div>
                </>
                
            }

        </div>
    )
}

export default Card;
