import React from "react";
import axios from "axios";

import Card from "../components/Card/Card";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrdersData() {
      try {
        const { data } = await axios.get(
          "https://6397f57f86d04c7633a1987c.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.cards], []));
        setIsLoading(false);
      } catch (error) {
        alert("Произошла ошибка");
      }
    }
    fetchOrdersData();
  }, []);

  return (
    <div className="content">
      <div className="content-block">
        <h1>Мои заказы</h1>
      </div>
      <div className="gameconsole">
        {(isLoading ? [...Array(8)] : orders).map((item, i) => (
          <Card key={i} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
