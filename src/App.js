import React from "react";
import axios from "axios";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Basket from "./components/Basket/Basket";

function App() {
  const [cards, setCards] = React.useState([]);
  const [basketCards, setBasketCards] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [basketOpened, setBasketOpened] = React.useState(false);

React.useEffect(() => {
  // через fetch
  // fetch('https://6397f57f86d04c7633a1987c.mockapi.io/cards')
  // .then(res => {
  //   return res.json();
  // })
  // .then (json => {
  //   setCards(json);
  // })
  axios.get('https://6397f57f86d04c7633a1987c.mockapi.io/cards')
  .then(res => {
     setCards(res.data);
  });

  axios.get('https://6397f57f86d04c7633a1987c.mockapi.io/basket')
  .then(res => {
     setBasketCards(res.data);
  })
}, []);

const onAddToBasket = (obj) => {
  axios.post('https://6397f57f86d04c7633a1987c.mockapi.io/basket', obj);
  setBasketCards(prev => [...prev, obj]);
};

const  onRemoveCards = (id) => {
  axios.delete(`https://6397f57f86d04c7633a1987c.mockapi.io/basket/${id}`);
  setBasketCards(prev => prev.filter(item => item.id !== id));
}

const onAddToFavourite = (obj) => {
  axios.post('https://6397f57f86d04c7633a1987c.mockapi.io/favourites', obj);
  setFavourites(prev => [...prev, obj]);
};

const onChangeSearchInput = (e) => {
  setSearchValue(e.target.value);
}

const onSearchValue = () => setSearchValue('');

  return (
    <div className="wrapper">
      {basketOpened && (
      <Basket cards={basketCards} 
      onClose={() => setBasketOpened(false)}
      onRemove={onRemoveCards}/>)}
      <Header onClickBasket={() => setBasketOpened(true)}/>
      <div className="content">
        <div className="content-block">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search-block">
            <img src='/img/search.svg' alt='search'/>
            {searchValue ? <img onClick={onSearchValue} className="basket-clear" src="/img/btn-remove.svg" alt="close"/> : null}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"/>
          </div>
        </div>
      <div className="sneakers">
        {cards
        .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((item, i) => (
          <Card
          title={item.name}
          price={item.price}
          imageUrl={item.imageUrl}
          key={i}
          onClickPlus={obj => onAddToBasket(obj)}
          onClickFavourite={obj => onAddToFavourite(obj)}
          />
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;