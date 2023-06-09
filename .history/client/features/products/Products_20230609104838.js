import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToStorage, removeFromStorage } from "./ProductSlice";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    addToStorage(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromStorage(productId);
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
            duct.id)}>Remove from Cart</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;