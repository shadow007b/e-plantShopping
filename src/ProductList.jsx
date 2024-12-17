import React, { useState } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Retrieve cart items from Redux store
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch Redux action to add item to the cart
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true, // Track added-to-cart state
    }));
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        // Add the rest of the plant objects here...
      ],
    },
    // Add other categories...
  ];

  return (
    <div className="product-list">
      <h1>Our Plants</h1>
      {plantsArray.map((category, index) => (
        <div key={index}>
          <h2>{category.category}</h2>
          <div className="plants-container">
            {category.plants.map((plant, idx) => (
              <div className="plant-card" key={idx}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <p><strong>{plant.cost}</strong></p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.name]} // Disable button if already added
                >
                  {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
