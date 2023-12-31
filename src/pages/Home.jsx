import React from 'react';

import Card from '../components/Card/Card';

function Home({
  cards,
  onAddToFavourite,
  onAddToBasket,
  searchValue,
  onChangeSearchInput,
  onSearchValue,
  isLoading,
}) {
  const renderCards = () => {
    const filterCards = cards.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    console.log(filterCards);
    return (isLoading ? [...Array(8)] : filterCards).map((item, i) => (
      <Card
        key={i}
        onClickPlus={(obj) => onAddToBasket(obj)}
        onClickFavourite={(obj) => onAddToFavourite(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content">
      <div className="content-block">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все консоли'}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearchValue();
          }}
        >
          <div className="search-block">
            <img src="/img/search.svg" alt="search" />
            {searchValue ? (
              <img
                onClick={onSearchValue}
                className="basket-clear"
                src="/img/btn-remove.svg"
                alt="close"
              />
            ) : null}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск" />
          </div>
        </form>
      </div>
      <div className="gameconsole">{renderCards()}</div>
    </div>
  );
}
export default Home;
