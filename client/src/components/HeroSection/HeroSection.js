import React from "react";
import { Button } from "../Header/Button";
import { useRef, useEffect,useState } from 'react';
import "./HeroSection.css";
import "../../App.css";
import $ from 'jquery'; 
import { useIsMounted } from "../../hooks/useIsMounted";


function HeroSection() {
  const [isplaying, setIsplaying] = useState(true);
  const {clearInterval, setInterval} = window;
  var words = ['+2200 AGRI FOOD SELLER & BUYER'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 100;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  } ,speed);
  
};


const intervalId = useRef(null)
const isMounted = useIsMounted();
const mounted = useRef(false);

useEffect(() => {
  
  wordflick();
  if(isMounted)
  clearInterval(wordflick());
 

}, [isMounted]);
  return (
    <div className="container-banner">
      <div className="container">
        <div className="row">
          <div class="col-md-8 container-banner__left">
            <div class="relative-flex">
              <h2 class="paragraph1 white">
                a b2b digital marketplace where fair food trade is made easy,
                fast and transparent!
              </h2>
              <p class="word">
                
              </p>
              <div class="row social_media_row">
                <div class="col-lg-6 col-md-4 center">
                  <a href="/users/sign_up">
                    <button class="btn btn__join col-md-12 col-8">
                      Join Now
                    </button>
                  </a>
                </div>
                <div class="col-lg-6 col-md-8">
             <a href="https://www.youtube.com/channel/UCXxytegg70uIUAQ0JtYLXhg" target="_blank"><img class="social_media_icon" src="/images/socials/youtube.png" alt="Youtube"/></a>
              <a href="https://twitter.com/agrimarketplace" target="_blank"><img class="social_media_icon" src="/images/socials/twitter.png" alt="Twitter"/></a>
              <a href="https://www.linkedin.com/company/agri-marketplace/" target="_blank"><img class="social_media_icon" src="/images/socials/linkedin.png" alt="Linkedin"/></a>
              <a href="https://www.instagram.com/agri_marketplace/" target="_blank"><img class="social_media_icon" src="/images/socials/instagram.png" alt="Instagram"/></a>
              <a href="https://www.facebook.com/agrimarketplace" target="_blank"><img class="social_media_icon" src="/images/socials/facebook.png" alt="Facebook"/></a>
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-4 container-banner__right d-none d-sm-block">
        <p class="text-center right__title">Select a product to buy/sell</p>
        <div class="row">
  <div class="container-banner__families mx-auto">
      <div class="container-banner__family">
      
          <div class="circle-white">
            <img class="product__img" src="/images/icons_banner/Agroimp__0017_cereals.png"/>
          </div>
          <p class="product__text">Grains </p>
     </div>
      <div class="container-banner__family">
    
          <div class="circle-white">
            <img class="product__img" src="/images/icons_banner/Agroimp__0016_nuts2.png" />
          </div>
          <p class="product__text">Nuts </p>
    </div>
      <div class="container-banner__family">
     
          <div class="circle-white">
            <img class="product__img" src="/images/icons_banner/Agroimp__0009_coffee.png" />
          </div>
          <p class="product__text">Green Coffee </p>
     </div>
      <div class="container-banner__family">
      
          <div class="circle-white">
            <img class="product__img" src="/images/icons_banner/Azeite.png"/>
          </div>
          <p class="product__text">Olive Oil </p>
     </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
