import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
    {
        category: "Air Purifying Plants",
        plants: [
            { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927b6ebfa", cost: "$15", description: "Produces oxygen at night." },
            { name: "Spider Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d40", cost: "$12", description: "Filters formaldehyde." },
            { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593696954577-ab3d39317b97", cost: "$18", description: "Removes mold spores." }
        ]
    },
    {
        category: "Aromatic Fragrant Plants",
        plants: [
            { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134cd99", cost: "$20", description: "Calming scent." },
            { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", cost: "$18", description: "Sweet fragrance." }
        ]
    },
    {
        category: "Low Maintenance Plants",
        plants: [
            { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", cost: "$25", description: "Thrives in low light." },
            { name: "Pothos", image: "https://images.unsplash.com/photo-1601058223690-333e36e6329f", cost: "$10", description: "Very easy to grow." }
        ]
    }
];

function ProductList() {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector(state => state.cart.items || []);
    
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const cartIconCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <nav className="navbar">
                <div className="nav-brand">Paradise Nursery</div>
                <div className="nav-links">
                    <button onClick={() => setShowCart(false)}>Plants</button>
                    <button onClick={() => setShowCart(true)}>Cart ({cartIconCount})</button>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-list">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>
                            <div className="product-grid">
                                {category.plants.map((plant, plantIndex) => {
                                    const isAdded = cartItems.some(item => item.name === plant.name);
                                    return (
                                        <div className="product-card" key={plantIndex}>
                                            <img src={plant.image} alt={plant.name} style={{width: '200px', height: '200px', objectFit: 'cover'}}/>
                                            <h3>{plant.name}</h3>
                                            <p>{plant.description}</p>
                                            <p>{plant.cost}</p>
                                            <button 
                                                onClick={() => handleAddToCart(plant)} 
                                                disabled={isAdded}
                                                style={{backgroundColor: isAdded ? 'grey' : '#4CAF50', color: 'white', padding: '10px'}}
                                            >
                                                {isAdded ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
