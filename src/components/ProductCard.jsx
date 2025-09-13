import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="product-card">
      <img
        src={imgError ? "https://via.placeholder.com/100" : product.image}
        alt={product.title}
        onError={() => setImgError(true)}
      />
      <h3>{product.title}</h3>
      <p>Category: {product.category}</p>
      <p>${product.price}</p>
      <p>Rating: {product.rating?.rate}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;