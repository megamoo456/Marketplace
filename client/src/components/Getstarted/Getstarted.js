import React from "react";
import { Button } from "../Header/Button";
import "./Getstarted.css";

function Getstarted() {
  return (
    <div className="container-get-started">
      <div className="container">
        <h1>Get Started</h1>
        <p>
          We open the door to thousands of approved buyers and sellers. Post
          your crop bid as a registered buyer, or create your crop offer as a
          platform verified seller. Through our rigorous customer compliance we
          make sure that only reliable users gain access to our digital
          marketplace. There are two ways to get started:
        </p>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h2>Post product as a seller</h2>
            <p>
              As a seller, post products for the agricultural crop you are looking
              to sell, and gain immediate access to credit-verified buyers. And you can communicate with other
              farmers or sellers. 
            </p>
            <div className="row get-started-btn">
              <div className="col-sm-12 col-md-6 left">
                <a className="btnn"> Register as a seller</a>
              </div>
              <div className="col-sm-12 col-md-6 right">
                <a className="btnn">Selling product video</a>
                </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <h2>Post offer as a buyer</h2>
            <p>
            As a buyer, post offers for the agricultural crop you are looking to buy.
             Communicate to the market what you are looking for, and get rapid reactions from interested farmers or sellers.
            </p>
            <div className="row get-started-btn">
              <div className="col-sm-12 col-md-6 left">
                <a className="btnn"> Register as a buyer</a>
              </div>
              <div className="col-sm-12 col-md-6 right">
                <a className="btnn">Buying offer video</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Getstarted;
