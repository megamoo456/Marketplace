import { useCart } from "react-use-cart";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import "./Cart.css"

import {
    CartStateContext,
    CartDispatchContext,
    removeFromCart,
    toggleCartPopup
  } from "../../contexts/cart";

function Cart() {
    const { isCartOpen } = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);
    const history = useHistory();
  const [group , setGroup] = useState({});
  const [sellerId, setSellerId] = useState({});

    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
    } = useCart();

    useEffect(()=>{
      let group = items.reduce((r, a) => {

        r[a.name] = [...r[a.name] || [], a];
        return r;
       }, {});       
       setGroup(group);

       let SellerID = items.reduce((r, a) => {

        r[a.sellerId] = [...r[a.sellerId] || [], a];
        return r;
       }, {});       
       setSellerId(SellerID);
  console.log(group);

    },[items])

    const handleProceedCheckout = (keyName) => {
      toggleCartPopup(dispatch);
      localStorage.setItem("Seller",keyName);
      localStorage.setItem("SellerID",Object.keys(sellerId));
      history.push("/checkout");
      window.location.reload(false);

    };

    return (
      <> 
    <div className={classNames("cart-preview", { active: isCartOpen })}>
    {isEmpty &&
    <>
    <ul className="cart-items">
        <div className="empty-cart">
        <img src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart"/>
        <h2>Your cart is empty</h2>
        </div>
      </ul>
       <div className="action-block">

       <button
         type="button"
         className={classNames({ disabled: items && items.length === 0 })}
       >
         PROCEED TO CHECKOUT
       </button>
     </div>
     </>
       }
      {Object.keys(group).map((keyName, items) => (
        <>
      <ul className="cart-items" key={keyName}>
         {group[keyName].map((product) => {
          return (
            <li className="cart-item" key={product._id}>
              <img className="product-image" src={product.image} />
              <div className="product-info">
                <p className="product-name">{product.title}</p>
                <p className="product-price">{product.price}</p>
              </div>
              <div className="product-total">
                <p className="quantity">
                  {`${product.quantity} ${
                    product.quantity > 1 ? "Nos." : "No."
                  }`}
                </p>
                <p className="amount">{product.quantity * product.price}</p>
              </div>
              <div className="stepper-input">
              <button 
                onClick={() => updateItemQuantity(product._id, product.quantity - 1)}
             className="decrement"
             >
                -
              </button>
              <button
                onClick={() => updateItemQuantity(product._id, product.quantity + 1)}
                className="increment"
             >
                +
              </button>           
              </div>
              <button
                className="product-remove"
                onClick={() => removeItem(product._id)}
              >
                ×
              </button>
            </li>
          
          );
        })}
      
      </ul>
   
      <div className="action-block">
        <span className="seller-name">Seller Name :{keyName}</span>
        <button
          type="button"
          className={classNames({ disabled: items && items.length === 0 })}
          onClick={() => {handleProceedCheckout(keyName)}}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
      </>
     ))}
    </div>


    
                
      </>
    );
  }

export default Cart;