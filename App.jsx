import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="App">
      {!showProducts ? (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button onClick={() => setShowProducts(true)}>Get Started</button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
