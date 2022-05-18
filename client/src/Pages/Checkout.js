import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { Context } from "../ContextStore";
import "../assets/css/pages/Checkout.css";
import "../assets/css/base/icons.css";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { createChatRoom } from "../services/messagesData";
import { addOffer } from "../services/productData";
import { DescriptionAlerts } from "../components/Alert/DescriptionAlerts";

import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress,
} from "../contexts/checkout";
import { useCart } from "react-use-cart";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../components/core/form-controls/Input";
import LogOut from "./LogOut";
import { createOffer } from "../services/messagesData";
import CounterOffer from "../components/CounterOffer/CounterOffer";
import Cart from "../components/Cart/Cart";
import { useLayoutEffect } from "react";
   /*  Notifation Section */
   import { ToastContainer, toast } from 'react-toastify';
   import 'react-toastify/dist/ReactToastify.css';

         /*  End  Notifation Section */

const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .min(10, "Phone Number is too short")
    .max(15, "Phone Number is too long"),
  addressLine: Yup.string().required("Door No. & Street is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  code: Yup.string().required("ZIP/Postal code is required!"),
  country: Yup.string().required("Country is required!"),
});

const LoginStep = () => {
  const history = useHistory();
  const { user, isLoggedIn } = useContext(Context);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleContinueShopping = () => {
    history.push("/");
  };
  const handleLoginAsDiffUser = () => {
    LogOut();
    history.push("/auth");
  };
  const handleGotoLogin = () => {
    history.push("/auth");
  };
  const handleProceed = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  return (
    <div className="detail-container">
      <h2>Sign In now!</h2>
      <div className="auth-message">
        {isLoggedIn ? (
          <>
            <p>
              Logged in as <span>{user.username}</span>
            </p>
            <button onClick={() => handleLoginAsDiffUser()}>
              Login as Different User
            </button>
          </>
        ) : (
          <>
            <p>Please login to continue.</p>
            <button onClick={() => handleGotoLogin()}>Login</button>
          </>
        )}
      </div>
      <div className="actions">
        <button className="outline" onClick={() => handleContinueShopping()}>
          <i className="rsc-icon-arrow_back" /> Continue Shopping
        </button>
        <button disabled={!isLoggedIn} onClick={() => handleProceed()}>
          Proceed
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const AddressStep = () => {
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const handleSavewithoutAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };
  return (
    <div className="detail-container">
      <h2>Shipping Address</h2>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          addressLine: "",
          city: "",
          state: "",
          code: "",
          country: "",
          shipping: false,
        }}
        validationSchema={AddressSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            values.shipping = true;
            const addressData = { ...values };
            resetForm();
            handleSaveAddress(addressData);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {() => (
          <Form>
            <div className="field-group">
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                component={Input}
              />
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                component={Input}
              />
            </div>
            <Field
              name="addressLine"
              type="text"
              placeholder="Door No. & Street"
              component={Input}
            />
            <div className="field-group">
              <Field
                name="city"
                type="text"
                placeholder="City"
                component={Input}
              />
              <Field
                name="state"
                type="text"
                placeholder="State"
                component={Input}
              />
            </div>
            <div className="field-group">
              <Field
                name="code"
                type="text"
                placeholder="ZIP/Postal Code"
                component={Input}
              />
              <Field
                name="country"
                type="text"
                placeholder="Country"
                component={Input}
              />
            </div>
            <div className="actions">
              <button
                type="button"
                className="outline"
                onClick={(addressData) => handleSavewithoutAddress(addressData)}
              >
                Without Shipping
              </button>
              <button type="submit">
                Save Address
                <i className="rsc-icon-arrow_forward" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
/* Slider of the counter offer */
const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
/* END Slider of the counter offer */
const PaymentStep = (item, history) => {
  const { shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [AlertPopup, setAlertPopup] = useState(false);
  const [offer, setOffer] = useState({});
  let subtotal = localStorage.getItem("subtotal");
  let sellerId = localStorage.getItem("SellerID");
  let adresse = JSON.parse(localStorage.getItem("checkout"));
  const [valueco, setValueco] = useState();
  const { userData, setUserData } = useContext(Context);

  const handleBackToAddress = () => {
    localStorage.setItem("checkout", '{"shipping":false}');
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  /* Create the offer with chatroom , your offer and alert confirmation  */
  const handlePayment = (e) => {
    createOffer({
      owner: userData,
      seller: item.item[0].sellerId,
      items: item.item,
      subtotal,
      adress: adresse,
      statue: "Pending",
    })
      .then((ress) => {
        createChatRoom(ress.offer.seller, "Check Out My Offer !", ress.offer)
          .then((res) => {
            console.log(res);
            history.push(`/messages/${res.offerId}`);
          })
          .catch((err) => console.log(err));
        addOffer(ress.offer._id, ress.offer.seller);
        toast.info(`Total:${ress.offer.subtotal},Offer Created !`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        
        setAlertPopup(true);
        setTimeout(() => {
          setAlertPopup(false);
        }, 4000);
      })
      .catch((err) => console.log(err));
    localStorage.setItem("checkout", '{"shipping":false}');


  };
   /* End Creation  */
  /* send the counter offer */
  const send = (e) => {
    createOffer({
      owner: userData,
      seller: item.item[0].sellerId,
      items: item.item,
      subtotal: valueco,
      adress: adresse,
      statue: "Pending",
    })
      .then((ress) => {
        createChatRoom(ress.offer.seller, "Check Out My Offer !", ress.offer)
          .then((res) => {
            history.push(`/messages/${res.offerId}`);
          })
          .catch((err) => console.log(err));
        addOffer(ress.offer._id, ress.offer.seller);

        setAlertPopup(true);
        setTimeout(() => {
          setAlertPopup(false);
        }, 4000);
      })
      .catch((err) => console.log(err));
    localStorage.setItem("checkout", '{"shipping":false}');
  };
  /* END send the counter offer */
  /* Change the counter offer total price */
  const [value, setValue] = useState(100);

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
    valueLabelFormat(value);
    setValueco(valueLabelFormat(value));
  };
  // value of the counter offer
  function valueLabelFormat(value) {
    let subtotal = localStorage.getItem("subtotal");
    var newvalue = (subtotal - (subtotal * value) / 100).toFixed(2);
    return newvalue;
  }
  /* End Change the counter offer total price */

  return (
    <div className="detail-container">
      <h2>Payment</h2>
      {/* <div>
        <pre>{JSON.stringify(shippingAddress, null, 0)}</pre>
      </div> */}
      <div className="actions">
        <button
          type="button"
          className="outline"
          onClick={() => handleBackToAddress()}
        >
          <i className="rsc-icon-arrow_back" /> Back to Shipping Details
        </button>
        <div className="two-buttons">
          <button
            disabled={!shippingAddress}
            onClick={() => setButtonPopup(true)}
          >
            Counter offer
            <i className="rsc-icon-arrow_forward" />
          </button>
          &nbsp;&nbsp;&nbsp;
          <button disabled={!shippingAddress} onClick={() => {handlePayment();}}>
            Checkout
            <i className="rsc-icon-arrow_forward" />
          </button>
          <DescriptionAlerts trigger={AlertPopup} setTrigger={setAlertPopup} />
        </div>
        <CounterOffer trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Typography gutterBottom>Discount {`(${value} %)`}</Typography>
          <PrettoSlider
            value={value}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            onChange={handleChange}
            defaultValue={20}
          />
          <Typography gutterBottom>Total</Typography>
          <Typography gutterBottom>{valueco} €</Typography>
          &nbsp;&nbsp;&nbsp;
          <button
            onClick={() => {
              send();
            }}
          >
            Send
            <i className="rsc-icon-arrow_forward" />
          </button>
          <DescriptionAlerts trigger={AlertPopup} setTrigger={setAlertPopup} />
        </CounterOffer>
      </div>
    </div>
  );
};

const Checkout = (props) => {
  const { items = [], cartTotal } = useCart();
  const { isLoggedIn } = useContext(Context);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const [Subtotal, setSubtotal] = useState();
  const [filtredItem, setFiltredItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let seller = localStorage.getItem("Seller");
    // setTimeout(() => {setLoading(true) }, 500)
    setFiltredItem(items.filter((element) => element.name === seller));
    setSubtotal(
      items.filter((element) => element.name === seller).reduce(getSum, 0)
    );
    // setLoading(false);
    localStorage.setItem(
      "subtotal",
      items.filter((element) => element.name === seller).reduce(getSum, 0)
    );
  }, [items]);

  const getSum = (total, item) => {
    return total + item.itemTotal;
  };

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="order-details">
          <ul className="timeline">
            <li
              className={classNames({
                done: shippingAddress !== null,
                active: step === CHECKOUT_STEPS.SHIPPING,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.SHIPPING)}
            >
              <h2>Shipping</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: false,
                active: step === CHECKOUT_STEPS.PAYMENT,
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}
            >
              <h2>Payment</h2>
              <i className="rsc-icon-check_circle" />
            </li>
          </ul>
          {step === CHECKOUT_STEPS.SHIPPING && <AddressStep />}
          {step === CHECKOUT_STEPS.PAYMENT && (
            <PaymentStep item={filtredItem} total={Subtotal} />
          )}
        </div>

        <div className="order-summary">
          <h2>Summary</h2>
          <ul className="cart-items">
            {filtredItem.map((product, idx) => {
              return props.loading ? (
                <p>Loading...</p>
              ) : (
                <li className="cart-item" key={idx}>
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
                </li>
              );
            })}
          </ul>

          <ul className="total-breakup">
            <li className="subtotal">
              <span>Subtotal</span>
              <span>{Subtotal}</span>
            </li>
            <li>
              <span>Shipping</span>
              <span>0</span>
            </li>
            <li>
              <h2>Total</h2>
              <h2>{Subtotal}</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
