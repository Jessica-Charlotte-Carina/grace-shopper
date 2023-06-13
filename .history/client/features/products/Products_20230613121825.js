import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToStorage } from "./ProductSlice";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  // using storage vs token
  // storage" allows a session storage to store data on the client-side (brower) to persist data between different pages even when 
  // user closes and reopens the browser
  // 
  const handleAddToCart = (product) => {
    addToStorage(product); // adds product to the cart storage
  };



  return (
    <div>
      <div className='product-box'>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3> 
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            </Link>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;