import React from "react";
import './Card.scss';

const Card = ({title, price, imageUrl}) => { 
    return (
        <div className="card">
            <div className="card-favourite">
                <img src="/img/unliked.svg" alt="unliked"/>
            </div>
                <img className="card-sneakers" src={imageUrl} alt='sneakers'/>
                <h5>{title}</h5>
            <div className="card-bottom">
                <div className="card-price">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                    <button className="card-button">
                    <img className="card-plus" src='/img/plus.svg' alt='plus'/>
                    </button>
            </div>
        </div>
    )
}

export default Card;
