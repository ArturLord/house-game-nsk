import React from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Basket from "./components/Basket/Basket";


const arr = [
  {
    name: 'Мужские кроссовки Nike Blazer Mid Suede', 
    price: 11999,
    imageUrl: '/img/sneakers/1.jpg'
  },
  {
    name: 'Мужские кроссовки Nike Air Max 270', 
    price: 15700,
    imageUrl: '/img/sneakers/2.jpg'
  },
  {
    name: 'Мужские кроссовки Nike Travel Blazer', 
    price: 16890,
    imageUrl: '/img/sneakers/3.jpg'
  },
  {
    name: 'Мужские кроссовки Nike Vacuum Hell', 
    price: 16900,
    imageUrl: '/img/sneakers/4.jpg'
  },
]

function App() {
  return (
    <div className="wrapper">
      <Basket/>
      <Header/>
      <div className="content">
        <div className="content-block">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src='/img/search.svg' alt='search'/>
            <input placeholder="Поиск"/>
          </div>
        </div>
      <div className="sneakers">

        {arr.map(item => (
          <Card
          title={item.name}
          price={item.price}
          imageUrl={item.imageUrl}/>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
