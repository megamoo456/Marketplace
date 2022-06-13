import { useContext, useState, useEffect, useRef } from "react";
import "../App.css";
import HeroSection from "../components/HeroSection/HeroSection";
import Getstarted from "../components/Getstarted/Getstarted";

import {
  getOfferConversations,
  getNotificationFromOffers,
} from "../services/messagesData";
/*  Notifation Section */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*  End  Notifation Section */

const Home = () => {
  const [offerC, setOfferC] = useState([]);
  const [offerW, setOfferW] = useState([]);

  const options = {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    getOfferConversations()
      .then((res) => {
        getNotificationFromOffers(res)
          .then((x) => {
            console.log(x);
            setOfferC(x.confirmed);
            setOfferW(x.ontheway);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [setOfferC,setOfferW]);

  return (
    <>
      {offerC?.map((xx) => {
        toast.success(
          `Offer with subtotal ${xx.subtotal} is confirmed !`,
          options
        );
      })}
      {offerW?.map((w) => {
        toast.info(
          `Offer with subtotal ${w.subtotal} is On the Way !`,
          options
        );
      })}
      <HeroSection />
      <Getstarted />
    </>
  );
};

export default Home;
