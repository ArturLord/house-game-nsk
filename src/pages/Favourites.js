import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../components/context";

function Favourites({onAddToFavourite}) {

  const {favourites} = React.useContext(AppContext);
    return (
        <div className="content">
        <div className="content-block">
          <h1>Мои Закладки</h1>

        </div>
      <div className="sneakers">
      {favourites
        .map((item, i) => (
          <Card
          key={i}
          favourite={true}
          onClickFavourite ={onAddToFavourite}
          {...item}
          />
        ))}
      </div>
      </div>
    )
}

 export default Favourites;