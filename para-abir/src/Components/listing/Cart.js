import React, { useState, useEffect } from 'react';
import './cart.css'; // Import CSS file
import { TbShoppingCartOff } from "react-icons/tb";
import { GiEmptyHourglass } from "react-icons/gi";

function Cart(props) {
  const handleclickung = (id) => {
    const item = props.produits.find(ele => ele.id === id);
    props.setcart(props.cart.filter(ele => ele !== item));
  };

  const [quantities, setQuantities] = useState({});

  const totalPrice = Object.keys(quantities).reduce((total, productId) => {
    const product = props.cart.find(item => item.id === productId);
    return total + (product ? product.price * quantities[productId] : 0);
  }, 0);

  // Function to handle quantity increase
  const handleIncreaseQuantity = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1
    }));
  };

  // Function to handle quantity decrease
  const handleDecreaseQuantity = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0)
    }));
  };

  // Update total price when quantities change
  useEffect(() => {
    // Calculate total price
    const updatedTotalPrice = Object.keys(quantities).reduce((total, productId) => {
      const product = props.cart.find(item => item.id === productId);
      return total + (product ? product.price * quantities[productId] : 0);
    }, 0);
  }, [quantities, props.cart]);

  return (
    <div className="container main-content">

      <div className='text-start'>
        {props.cart.length === 0 ? (
          <div className="col-12 carting">
            <h1><GiEmptyHourglass className='iconic'/></h1>
            <p>Il n'y a plus d'articles dans votre favorite..</p>
          </div>
        ) : (props.cart.map(product => (
          <div key={product.id} className="card mb-3 product-card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`Produits/${product.type}/${product.src}`}
                  alt={product.title}
                  className="img-fluid rounded-start product-image"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-text"><b>Quantity: {quantities[product.id] || 0}</b></p>
                  <div className="btn-group" role="group" aria-label="Quantity">
                    <button type="button" className="btn btn-success" onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                    <button type="button" className="btn btn-success" onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                  </div><button type="button" className="btn btn-danger mx-4" onClick={() => handleclickung(product.id)}><TbShoppingCartOff /></button><hr></hr>
                  <p className="card-text"><b>description : </b>{product.description.substring(0, 150)}</p>
                </div>
              </div>
            </div>
          </div>
        )))}
      </div>
      <div className="text-end">
        <div className="text-left">
          <p>Price: {totalPrice} DH</p>
        </div>
        <div className="text-right">
          <p>Livraison: Gratuit</p>
        </div>
        <div className="checkout">
          <button className="btn btn-primary">Checkout</button>
        </div>
        <div className="payment-icons">
          <img src="para-photo/visa.jpg" alt="Visa" className="payment-icon" />
          <img src="para-photo/master.jpg" alt="MasterCard" className="payment-icon" />
          <img src="para-photo/paypal.jpg" alt="PayPal" className="payment-icon" />
        </div>
      </div>
    </div>
  );
}

export default Cart;
