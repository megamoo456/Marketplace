import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../ContextStore";
import {
  Navbar,
  NavDropdown,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { Button } from "./Button.js";
import "primeicons/primeicons.css";
import "./Header.css";
import Cart from "../Cart/Cart";
import { useCart } from "react-use-cart";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { getUser, getUserRole } from "../../services/userData";

import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup,
  clearCart,
} from "../../contexts/cart";

import { NotificationCenter } from "../NotificationCenter/NotificationCenter";
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useIsMounted } from "../../hooks/useIsMounted";

function Header() {
  const { userData, setUserData } = useContext(Context);
  const { items, totalUniqueItems, emptyCart } = useCart();
  const [roles, setRoles] = useState([]);

  const { items: cartItems, isCartOpen } = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);
  /*  Notifation Section */


  /*  End  Notifation Section */
  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const isMounted = useIsMounted();

  useEffect(() => {
    showButton();
    // userids.current.setUserid(userids._id)
    console.log(isMounted)

    getUser()
      .then((x) => {
        console.log(x.user._id)
        getUserRole(x.user._id)
          .then((res) => {
            console.log(res[0]);
            setRoles(res[0]);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    
  }, []);
  //console.log(userData);
  window.addEventListener("resize", showButton);
  return (
    <Navbar className="navbar" collapseOnSelect bg="light" variant="light">
      <div className="container">
        <Navbar.Brand>
          <NavLink onClick={closeMobileMenu} className="navbar-brand" to="/">
            AgriMarket...
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          {userData ? (
            <Nav>
              <div className="menu-icon" onClick={handleClick}>
                <i
                  className={click ? "pi pi-fw pi-times" : "pi pi-fw pi-bars"}
                />
              </div>

              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link className="nav-links" onClick={closeMobileMenu} to="/">
                    <i className="pi pi-fw pi-home"></i>
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-links"
                    onClick={closeMobileMenu}
                    to="/Categories"
                  >
                    Marketplace
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    onClick={closeMobileMenu}
                    to="/Blog"
                  >
                    Blog
                  </Link>
                </li>
                {roles.includes('canTransporter') ? (
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    onClick={closeMobileMenu}
                    to="/Transport"
                  >
                    Transport
                  </Link>
                </li>): ('')}

                {/*  {userData.role.permissions.includes("Transporter") && (
                                     <li className='nav-item'>
                                        <Link className="nav-links" onClick={closeMobileMenu} to="/">
                                          Transporter
                                         </Link>
                                     </li>
                                )}   */}
                {/* Begin Notification Section */}
                <div className="nav-item" id="notif" onClick={closeMobileMenu}>
                  {/*     <button onClick={addNotification}>Add notificaiton</button>
                  <hr /> */}
                  <NotificationCenter />
                  <ToastContainer position="bottom-right" newestOnTop />
                </div>
              </ul>
              {/* END Notification Section */}

              <div className="cart">
                <a className="cart-icon" href="#" onClick={handleCartButton}>
                  {/*  <img
              className={props.cartBounce ? "tada" : " "}
              src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
              alt="Cart"
            /> */}
                  <ShoppingIcon className="shopping-icon" />

                  {totalUniqueItems ? (
                    <span className="cart-count">{totalUniqueItems}</span>
                  ) : (
                    ""
                  )}
                </a>
                <Cart />
              </div>
{roles.includes('canCreateProduct') ? (
                <NavLink 
                  className="nav-item"
                  id="addButton"
                  to="/add-product"
                  onClick={closeMobileMenu}
                >
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        <strong>Add</strong> a sell.
                      </Tooltip>
                    }
                  >
                    <BsFillPlusCircleFill />
                  </OverlayTrigger>
                </NavLink>) :('')
             }
              <NavDropdown
                title={
                  <img id="navImg" src={userData.avatar} alt="user-avatar" />
                }
                drop="left"
                id="collasible-nav-dropdown"
              >
                <NavLink
                  className="dropdown-item"
                  to={`/profile/${userData._id}`}
                  onClick={closeMobileMenu}
                >
                  <BsFillPersonFill />
                  Profile
                </NavLink>

                {/* <NavDropdown.Divider /> */}

                {/* <NavLink className="dropdown-item" to="/your-sells">
                                    <BsFillGridFill />Sells
                            </NavLink> */}
                <NavLink
                  className="dropdown-item"
                  to="/messages"
                  onClick={closeMobileMenu}
                >
                  <BsFillEnvelopeFill />
                  Messages
                </NavLink>
                {/* <NavLink className="dropdown-item" to="/wishlist">
                                    <BsFillHeartFill />Wishlist
                            </NavLink> */}
                <NavDropdown.Divider />

                <NavLink
                  className="dropdown-item"
                  to="/auth/logout"
                  onClick={() => {
                    closeMobileMenu();
                    setUserData(null);
                    emptyCart();
                  }}
                >
                  <IoLogOut />
                  Log out
                </NavLink>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <div className="menu-icon" onClick={handleClick}>
                <i
                  className={click ? "pi pi-fw pi-times" : "pi pi-fw pi-bars"}
                />
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link className="nav-links" onClick={closeMobileMenu} to="/">
                    <i className="pi pi-fw pi-home"></i>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    onClick={closeMobileMenu}
                    to="/Categories"
                  >
                    Marketplace
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    id="nav-sign-in"
                    onClick={closeMobileMenu}
                    to="/auth/login"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    onClick={closeMobileMenu}
                    to="/auth/register"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
              {/*              {button && <Button buttonStyle='btn--outline'>Sign In</Button>}  */}
              {/*   <NavLink className="nav-item" id="nav-sign-up" to="/"><i class="pi pi-fw pi-home"></i>
                                Home
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-up" to="/">
                                Marketplace
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                                Sign In
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-up" to="/auth/register">
                                Sign Up
                            </NavLink> */}
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
