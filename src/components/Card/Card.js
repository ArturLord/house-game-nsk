import React from "react";
import './Card.scss';

const Card = ({title, price, imageUrl, onClickPlus, onClickFavourite}) => { 
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);


    const HandlePlus = () => {
        onClickPlus({title, price, imageUrl});
        setIsAdded(!isAdded);
    };

    const onFavourite = () => {
        setIsFavourite(!isFavourite);
    }
    
    return (
        <div className="card">
            <div className="card-favourite" onClick={onFavourite}>
                <img src={isFavourite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked"/>
            </div>
                <img className="card-sneakers" src={imageUrl} alt='sneakers'/>
                <h5>{title}</h5>
            <div className="card-bottom">
                <div className="card-price">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                    <img className="card-plus" onClick={HandlePlus} 
                    src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt='plus'/>
            </div>
        </div>
    )
}

export default Card;
