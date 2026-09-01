import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector(state => state.cart.items || []);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        let total = 0;
        cartItems.forEach(item => {
            const cost = parseFloat(item.cost.substring(1));
            total += cost * item.quantity;
        });
        return total.toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container" style={{padding: '20px'}}>
            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img src={item.image} alt={item.name} style={{width: '100px', height: '100px', objectFit: 'cover'}}/>
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>Unit Price: {item.cost}</p>
                            <p>Total: ${(parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2)}</p>
                            <div className="cart-item-controls">
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span style={{margin: '0 10px'}}> {item.quantity} </span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <button onClick={() => handleRemove(item)} style={{marginTop: '10px', backgroundColor: 'red', color: 'white'}}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-actions" style={{marginTop: '20px'}}>
                <button onClick={onContinueShopping} style={{marginRight: '10px'}}>Continue Shopping</button>
                <button onClick={() => alert("Coming Soon")}>Checkout</button>
            </div>
        </div>
    );
}

export default CartItem;
