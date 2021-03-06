import "./Footer.css";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { Button } from "../Header/Button";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div className="footer-container">

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
           
            <Link to='#'>How it works</Link>
            <Link to='#'>Our Solution</Link>
            <Link to='#'>Career</Link>
            <Link to='#'>FAQ's</Link>
          </div>
          <div className="footer-link-items">
         
            <Link to='/'>Home</Link>
            <Link to='/Categories'>Market</Link>

          </div>
          </div>
          <div className="footer-link-wrapper">
          <div className="footer-link-items">
          
            <Link to='#'>Terms of Conditions</Link>
            <Link to='#'>Privacy Policy</Link>
            <Link to='#'>Cookies Policy</Link>
  
          </div>
          <div className="footer-link-items">
        
            <Link to='#'>+21654584310</Link>
            <Link to='#'>info@agrimarket.com</Link>
          </div>
          </div>
       
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              AgriMarket
              </Link>
            </div>
            <small className="website-rights">©2022, AgriMarket - All rights Reserved</small>
            <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='pi pi-fw pi-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='pi pi-fw pi-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='pi pi-fw pi-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='pi pi-fw pi-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='pi pi-fw pi-linkedin' />
            </Link>
          </div>
          </div>
      </section>
      {/*   <div className="connections">
          <a href="/#" id="instaIcon">
            <AiFillInstagram />
          </a>
          <a href="/#" id="fbIcon">
            <FaFacebook />
          </a>
          <a
            href="https://www.Linkedin.com/in/iva-tosheva/"
            target="_blank"
            rel="noreferrer"
            id="LinkedIcon"
          >
            <AiFillLinkedin />
          </a>
        </div>
        All Rights Reserved &copy; 2021 &#8226;
        <a
          href="https://github.com/Angel-Sky/ReactJS-Project"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a> */}
    </div>
  );
}

export default Footer;
