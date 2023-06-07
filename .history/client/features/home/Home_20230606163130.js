import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const username = useSelector((state) => state.auth.me.username);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h3>Hello, {username}</h3>
      <div>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;