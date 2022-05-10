import { useState, useRef, useEffect } from "react";
import * as React from "react";
import {
  getUserConversations,
  getOfferConversations,
  sendMessage,
  deleteOffer,
} from "../services/messagesData";
import { Container, Row, Form, InputGroup, Alert, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TabPanel from "../components/TabPanel/TabPanel";
import OfferByItemCard from "../components/OfferCard/OfferByItemCard";
// buttons of the offer
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "../components/Messages/Aside.css";
import "../components/Messages/Article.css";
// offer Message
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

///////////// tabPanel
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
/////////////
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Messages({ match }) {
  let chatId = match.params.id;
  const [conversations, setConversations] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selected, setSelected] = useState({
    chats: {
      _id: 0,
      seller: {
        _id: "",
        avatar: "",
        name: "",
      },
      buyer: {
        _id: "",
        avatar: "",
        name: "",
      },
      conversation: [],
    },
    isBuyer: null,
    myId: 0,
  });
  const [youroffer, setYouroffer] = useState([]);
  // offer Message
  const [expanded, setExpanded] = useState(null);

  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : null);
    if(!active){
    setHeight(200);
    setActive(false)
    }
  };
  /// panel Handlechange
  const [value, setValue] = useState(0);
  const [height, setHeight] = useState(200);
  const [active, setActive] = useState(false);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
    console.log(active)

  };

  const heightChanges = () => {
    setActive(true);
    setHeight(600);
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
      
    };
  }
  //////
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(null);
  const [alertShow, setAlertShow] = useState(false);

  //////// slider settings
  var settings = {
   
    vertical: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  //////

  useEffect(() => {
    getUserConversations()
      .then((res) => {
        setConversations(res);
      })
      .catch((err) => console.log(err));
    getOfferConversations()
      .then((res) => {
        console.log(res);
        console.log(conversations);
        setOffers(res);
      })
      .catch((err) => console.log(err));
    if (isSelected) {
      setSelected(conversations.find((x) => x.chats._id === chatId));
      setYouroffer(
        offers.filter(
          (element) =>
            (element.isSeller === false &&
              element.offers.seller._id ===
                conversations.find((x) => x.chats._id === chatId).chats.seller
                  ._id) ||
            (element.isSeller &&
              element.offers.owner._id ===
                conversations.find((x) => x.chats._id === chatId).chats.buyer
                  ._id)
        )
      );
    }
  
  }, [isSelected, chatId, setSelected, setOffers]);

  function deletetheOffer(e, id, owner) {
    e.preventDefault();
    deleteOffer(chatId, id, owner)
      .then((res) => {
        console.log(res);
        setAlert("Offer Deleted!");
        setAlertShow(true);
        setMessage("I reject your Offer");
        setSelected(
          selected,
          selected.chats.conversation.push({ message, senderId: res.seller })
        );
        setTimeout(() => {
          setAlert(null);
          setAlertShow(false);
          window.location.reload(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  function handleMsgSubmit(e) {
    e.preventDefault();
    sendMessage(chatId, message)
      .then((res) => {
        setAlert("Message sent!");
        setAlertShow(true);
        setMessage("");
        setSelected(
          selected,
          selected.chats.conversation.push({ message, senderId: res.sender })
        );
        setTimeout(() => {
          setAlert(null);
          setAlertShow(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <Row>
        <aside className="col-lg-4 col-md-4">
          <h3>Conversations</h3>
          {conversations.length >= 1 ? (
            <>
              {conversations.map((x) => (
                <div className="chat-connections" key={x.chats._id}>
                  <Link
                    onClick={() => setIsSelected(true)}
                    to={`/messages/${x.chats._id}`}
                  >
                    {x.isBuyer ? (
                      <>
                        <img src={x.chats.seller.avatar} alt="user-avatar" />{" "}
                        <span className="user-name">{x.chats.seller.name}</span>
                      </>
                    ) : (
                      <>
                        <img src={x.chats.buyer.avatar} alt="user-avatar" />{" "}
                        <span className="user-name">{x.chats.buyer.name}</span>
                      </>
                    )}
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <h5>No messages yet</h5>
          )}
        </aside>
        <article className="col-lg-8 col-md-8">
          {isSelected && (
            <>
              <div className="chat-selected-header col-lg-12">
                {selected.isBuyer ? (
                  <Link to={`/profile/${selected.chats.seller._id}`}>
                    <img src={selected.chats.seller.avatar} alt="user-avatar" />
                    <span className="user-name">
                      {selected.chats.seller.name}
                    </span>
                  </Link>
                ) : (
                  <Link to={`/profile/${selected.chats.buyer._id}`}>
                    <img src={selected.chats.buyer.avatar} alt="user-avatar" />
                    <span className="user-name">
                      {selected.chats.buyer.name}
                    </span>
                  </Link>
                )}
              </div>
              {alertShow && (
                <Alert
                  variant="success"
                  onClose={() => setAlertShow(false)}
                  dismissible
                >
                  <p>{alert}</p>
                </Alert>
              )}
              {isSelected &&
                youroffer.map((x) => (
                  <>
                    <Accordion
                      expanded={expanded === x.offers._id}
                      onChange={handleChange(x.offers._id)}
                      className="chat-selected-hb col-lg-12"
                      TransitionProps={{unmountOnExit: true}}
                      key={x.offers._id}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${x.offers._id}-content`}
                        id={`${x.offers._id}-header`}
                        className="me"
                      >
                        <Typography sx={{ flexShrink: 0 ,fontSize: 18 ,fontFamily:'afterglow' ,
                      fontWeight: 'unset'}} >
                          {x.isSeller ? "His Offer" : "My Offer"}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails >
                        {x.offers.adress.shipping ? (
                          <Box
                            sx={{
                              flexGrow: 1,
                              bgcolor: "background.paper",
                              display: "flex",
                              height: height,
                            }}
                          >
                            <Tabs
                              orientation="vertical"
                              variant="scrollable"
                              value={value}
                              onChange={handleChanges}
                              aria-label="Vertical tabs example"
                              sx={{ borderRight: 1, borderColor: "divider" }}
                            >
                              <Tab label="Shipping" {...a11yProps(0)} onClick={()=>{  setHeight(200);
                              setActive(false) } } />
                              <Tab label="Total" {...a11yProps(1)} onClick={()=>{  setHeight(200);
                              setActive(false) }}/>
                              <Tab label="Items" {...a11yProps(2)} onClick={()=>heightChanges()} />
                            </Tabs>
                            <TabPanel value={value} index={0}  className="slider-shipping">
                              <text style={{fontWeight: "bold"}}>State:</text> {x.offers.adress.state} <br />
                              <text style={{fontWeight: "bold"}}>Country:</text> {x.offers.adress.country}<br />
                              <text style={{fontWeight: "bold"}}>City:</text> {x.offers.adress.city}<br />
                              <text style={{fontWeight: "bold"}}>Code:</text> {x.offers.adress.code}<br />
                              <text style={{fontWeight: "bold"}}>Phone Number:</text> {x.offers.adress.phoneNumber}
                            </TabPanel>
                            <TabPanel value={value} index={1} className='total'>
                              {x.offers.subtotal}$
                            </TabPanel>
                            {active ? (
                          <TabPanel  value={value} index={2}  className="slider">
                              <Slider {...settings}>
                              {x.offers.items.map(x =>
                                <div>
                                  <OfferByItemCard params={x}/>
                                </div>
                          )}
                              </Slider>
                            </TabPanel>
                          ):("")}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              flexGrow: 1,
                              bgcolor: "background.paper",
                              display: "flex",
                              height: height,
                            }}
                          >
                            <Tabs
                              orientation="vertical"
                              variant="scrollable"
                              value={value}
                              onChange={handleChanges}
                              aria-label="Vertical tabs example"
                              sx={{ borderRight: 1, borderColor: "divider" }}
                            >
                              <Tab label="Total" {...a11yProps(0)} onClick={()=>{  setHeight(200);
                              setActive(false)} }/>
                              <Tab label="Items" {...a11yProps(1)} onClick={()=>heightChanges()} />
                            </Tabs>
                        
                            <TabPanel value={value} index={0} className='total'>
                              {x.offers.subtotal}$
                            </TabPanel>
                         {active ? (
                          <TabPanel  value={value} index={1}  className="slider">
                              <Slider {...settings}>
                              {x.offers.items.map(x =>
                                <div>
                                  <OfferByItemCard params={x}/>
                                </div>
                          )}
                              </Slider>
                            </TabPanel>
                          ):("")}
                          </Box>
                        )}
                      </AccordionDetails>
                      {x.isSeller ? (
                        <div className="container action-offer">
                          <Button variant="contained" color="success">
                            Confirme
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={(e) =>
                              deletetheOffer(
                                e,
                                x.offers._id,
                                x.offers.owner._id
                              )
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outlined"
                        color="error"  onClick={(e) =>
                          deletetheOffer(
                            e,
                            x.offers._id,
                            x.offers.owner._id
                          )
                        }>
                        Cancel
                      </Button>
                      )}
                    </Accordion>
                  </>
                ))}
              {/*       <div className="chat-selected-hb col-lg-12">
                {selected &&
                  offers.map((x) => (
                    <div className="me" key={x._id}>
                      <span className="message">
                        Shipping :{x.adress.shipping.toString()}
                      </span>
                    </div>
                  ))}
              </div> */}
              <div className="chat-selected-body col-lg-12">
                {selected.chats.conversation.map((x) => (
                  <div
                    className={selected.myId === x.senderId ? "me" : "not-me"}
                    key={x._id}
                  >
                    <span className="message">{x.message}</span>
                  </div>
                ))}
              </div>
              <div className="chat-selected-footer col-lg-12">
                <Form onSubmit={handleMsgSubmit}>
                  <Form.Group>
                    <InputGroup className="chat-input">
                      <Form.Control
                        as="textarea"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></Form.Control>
                      <InputGroup.Append>
                        <Button
                          type="submit"
                          variant="secondary"
                          endIcon={<SendIcon />}
                        >
                          Send
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </div>
            </>
          )}
        </article>
      </Row>
    </Container>
  );
}

export default Messages;
