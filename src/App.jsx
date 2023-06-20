import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Basket from './components/Basket/Basket';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';
import AppContext from './components/context';

function App() {
  const [cards, setCards] = React.useState([]);
  const [basketCards, setBasketCards] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [basketOpened, setBasketOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function axiosData() {
      try {
        const [cardsResponse, basketResponse, favouritesResponse] = await Promise.all([
          axios.get('https://6397f57f86d04c7633a1987c.mockapi.io/cards'),
          axios.get('https://6397f57f86d04c7633a1987c.mockapi.io/basket'),
          axios.get('https://6397f57f86d04c7633a1987c.mockapi.io/favourites'),
        ]);

        setIsLoading(false);

        setBasketCards(basketResponse.data);
        setFavourites(favouritesResponse.data);
        setCards(cardsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
      }
    }

    axiosData();
  }, []);

  const onAddToBasket = async (obj) => {
    try {
      const findCards = basketCards.find((item) => +item.parentId === +obj.id);
      if (findCards) {
        setBasketCards((prev) => prev.filter((item) => +item.parentId !== +obj.id));
        await axios.delete(`https://6397f57f86d04c7633a1987c.mockapi.io/basket/${findCards.id}`);
      } else {
        setBasketCards((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://6397f57f86d04c7633a1987c.mockapi.io/basket',
          obj,
        );
        setBasketCards((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  };

  const onRemoveCards = (id) => {
    try {
      axios.delete(`https://6397f57f86d04c7633a1987c.mockapi.io/basket/${id}`);
      setBasketCards((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Произошла ошибка при удалении');
    }
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((item) => +item.id === +obj.id)) {
        axios.delete(`https://6397f57f86d04c7633a1987c.mockapi.io/favourites/${obj.id}`);
        setFavourites((prev) => prev.filter((item) => +item.id !== +obj.id));
      } else {
        const { data } = await axios.post(
          'https://6397f57f86d04c7633a1987c.mockapi.io/favourites',
          obj,
        );
        setFavourites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в любимые');
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isCardsAdded = (id) => {
    return basketCards.some((obj) => +obj.parentId === +id);
  };

  const isFavouriteAdded = (id) => {
    return favourites.some((obj) => +obj.parentId === +id);
  };

  return (
    <AppContext.Provider
      value={{
        cards,
        basketCards,
        isCardsAdded,
        onAddToBasket,
        onAddToFavourite,
        favourites,
        setBasketOpened,
        setBasketCards,
      }}
    >
      <div className="wrapper">
        <Basket
          cards={basketCards}
          onClose={() => setBasketOpened(false)}
          onRemove={onRemoveCards}
          opened={basketOpened}
        />

        <Header onClickBasket={() => setBasketOpened(true)} />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                cards={cards}
                basketCards={basketCards}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavourite={onAddToFavourite}
                onAddToBasket={onAddToBasket}
                isLoading={isLoading}
                isFavouriteAdded={isFavouriteAdded}
              />
            }
          />
          <Route
            exact
            path="/favourites"
            element={<Favourites onAddToFavourite={onAddToFavourite} />}
          />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
