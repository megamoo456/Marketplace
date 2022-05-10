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
            <h2>Post Offer as a seller</h2>
            <p>
              As a seller, post offers for the agricultural crop you are looking
              to sell, and gain immediate access to credit-verified buyers. Or
              simply react to an existing buyer’s bid and start your
              transaction.
            </p>
            <div className="row get-started-btn">
              <div className="col-sm-12 col-md-6 left">
                <a className="btnn"> Register as a seller</a>
              </div>
              <div className="col-sm-12 col-md-6 right">
                <a className="btnn">Selling offer video</a>
                </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <h2>Post Offer as a seller</h2>
            <p>
              As a seller, post offers for the agricultural crop you are looking
              to sell, and gain immediate access to credit-verified buyers. Or
              simply react to an existing buyer’s bid and start your
              transaction.
            </p>
            <div className="row get-started-btn">
              <div className="col-sm-12 col-md-6 left">
                <a className="btnn"> Register as a seller</a>
              </div>
              <div className="col-sm-12 col-md-6 right">
                <a className="btnn">Selling offer video</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Getstarted;
