import { useState, useRef, useEffect } from "react";
import * as React from "react";
import {
  getUserConversations,
  getOfferConversations,
  sendMessage,
  rejectOffer,
  sendreport,
} from "../services/messagesData";
import {
  Container,
  Row,
  Form,
  InputGroup,
  Alert,
  Modal,
} from "react-bootstrap";
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
///////////// counter offer the button
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
/*  Notifation Section */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*  End  Notifation Section */

////////
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CounterOffer from "../components/CounterOffer/CounterOffer";
import { updateitems } from "../services/productData";
import { OpenWithSharp } from "@material-ui/icons";

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
    if (!active) {
      setHeight(200);
      setActive(false);
    }
  };
  /* panel Handlechange */
  const [value, setValue] = useState(0);
  const [height, setHeight] = useState(200);
  const [active, setActive] = useState(false);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
    console.log(active);
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
  /* END panel Handlechange */
  /* Counter offer */
  const [buttonPopup, setButtonPopup] = useState(false);
  const [items, setItems] = useState([]);
  const [activeitem, setActiveitem] = useState(false);
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState();
  const [selecteditem, setSelecteditem] = useState({});
  const [selectedoffer, setSelectedoffer] = useState({});
  const [valueco, setValueco] = useState({ price: 0, quantity: 0 });
  // value of the counter offer
  const handleChangeamount = (prop) => (event) => {
    setValueco({ ...valueco, [prop]: event.target.value });
  };
  const handleChangequantity = (prop) => (event) => {
    setValueco({ ...valueco, [prop]: event.target.value });
  };

  const totalLabelFormat = (valueco) => {
    var newvalue = valueco.price * valueco.quantity;
    localStorage.setItem("newvalue", newvalue);
  };
  /* Update item counter offer Function */
  function updateitem(e) {
    e.preventDefault();
    updateitems(
      selectedoffer._id,
      selecteditem._id,
      valueco,
      localStorage.getItem("newvalue")
    )
      .then((res) => {
        console.log(res);
        notify();
        setTimeout(() => {
          window.location.reload(false);
        }, 5100);
      })
      .catch((err) => console.log(err));
  }
  /* END Update item counter offer Function */
  const handleChangeoffer = (event) => {
    console.log(event.target.value);
    setItems(event.target.value);
  };

  const handleClose = () => {
    console.log(valueco);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  /* END Counter offer */
  //////
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(null);
  const [alertShow, setAlertShow] = useState(false);
  const notify = () =>
    toast.success("Offer Updated !", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  /* slider settings */
  var settings = {
    vertical: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  /* END slider settings  */

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
                  ._id &&
              element.offers.statue[0] === "Pending") ||
            (element.isSeller &&
              element.offers.owner._id ===
                conversations.find((x) => x.chats._id === chatId).chats.buyer
                  ._id &&
              element.offers.statue[0] === "Pending")
        )
      );
    }
  }, [isSelected, chatId, setSelected, setOffers]);

  function rejecttheOffer(e, id) {
    e.preventDefault();
    rejectOffer(chatId, id)
      .then((res) => {
        console.log(res);
        setAlert("Offer Rejected !");
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
  /* Signaler user */
  const [showMsg, setShowMdg] = useState(false);
  const [openS, setOpenS] = useState(false);
  const handleCloseU = () => setShowMdg(false);
  const handleShowU = () => setShowMdg(true);
  const [messageR, setMessageR] = useState("");

  const [reason, setReason] = useState("");

  const handleMsgChangeS = (e) => {
    e.preventDefault();
    setMessageR(e.target.value)
}
  const handleCloseS = () => {
    setOpenS(false);
  };

  const handleOpenS = () => {
    setOpenS(true);
  };
  const handleChangeS = (event) => {
    setReason(event.target.value);
  };
  const onMsgSendS = (e,id,buyerid,sellerid) => {
    e.preventDefault();
    sendreport(id,reason, messageR,buyerid,sellerid)
        .then((res) => {
        console.log(res)
        })
        .catch(err => console.log(err))
}
  /* End signaler user */
  return (
    <Container>
      <Row>
        <aside className="col-lg-4 col-md-4">
          <h3>Conversations</h3>
          {conversations.length >= 1 ? (
            <>
              {conversations.map((x) => (
                <>
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
                <Modal show={showMsg} onHide={handleCloseU} >
                  <Modal.Header closeButton>
                    <Modal.Title>Report the user</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                    <FormControl sx={{ m: 1, minWidth: 120  }}>
                        <InputLabel id="demo-controlled-open-select-label">
                          Reasons
                        </InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={openS}
                          onClose={handleCloseS}
                          onOpen={handleOpenS}
                          value={reason}
                          label="Reasons"
                          onChange={handleChangeS}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"Sexual Abuse"}>Sexual Abuse</MenuItem>
                          <MenuItem value={"Spamming"}>Spamming</MenuItem>
                          <MenuItem value={"Fake User"}>Fake User</MenuItem>
                          <MenuItem value={"Verbal Abuse"}>Verbal Abuse</MenuItem>
                          <MenuItem value={"Trolling"}>Trolling</MenuItem>
                        </Select>
                  </FormControl>
                  <InputLabel >
                          Explain
                        </InputLabel>
                  <Form.Control as="textarea" name="textarea" onChange={handleMsgChangeS} rows={2} />
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="dark" onClick={(e)=> onMsgSendS(e,x.chats._id,x.chats.buyer._id,x.chats.seller._id)}>Send</Button>
                    <Button variant="secondary" onClick={handleCloseU}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                </>
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
                  <>
                    <Link to={`/profile/${selected.chats.seller._id}`}>
                      <img
                        src={selected.chats.seller.avatar}
                        alt="user-avatar"
                      />
                      <span className="user-name">
                        {selected.chats.seller.name}
                      </span>
                    </Link>
                    <Button sx={{ color: "red" }} onClick={handleShowU}>
                      Signaler
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to={`/profile/${selected.chats.buyer._id}`}>
                      <img
                        src={selected.chats.buyer.avatar}
                        alt="user-avatar"
                      />
                      <span className="user-name">
                        {selected.chats.buyer.name}
                      </span>
                    </Link>
                    <Button sx={{ color: "red" }} onClick={handleShowU}>
                      Report
                    </Button>
                  </>
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
                    {/* Begin Detailed Offer in the messages */}
                    <Accordion
                      expanded={expanded === x.offers._id}
                      onChange={handleChange(x.offers._id)}
                      className="chat-selected-hb col-lg-12"
                      TransitionProps={{ unmountOnExit: true }}
                      key={x.offers._id}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${x.offers._id}-content`}
                        id={`${x.offers._id}-header`}
                        className="me"
                      >
                        <Typography
                          sx={{
                            flexShrink: 0,
                            fontSize: 18,
                            fontFamily: "afterglow",
                            fontWeight: "unset",
                          }}
                        >
                          {x.isSeller ? "His Offer" : "My Offer"}
                        </Typography>
                      </AccordionSummary>
                      {/* Begin Detailed items in the offer */}
                      <AccordionDetails>
                        {x.offers.adress.shipping ? (
                          /* Items with shipping */
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
                              <Tab
                                label="Shipping"
                                {...a11yProps(0)}
                                onClick={() => {
                                  setHeight(200);
                                  setActive(false);
                                }}
                              />
                              <Tab
                                label="Total"
                                {...a11yProps(1)}
                                onClick={() => {
                                  setHeight(200);
                                  setActive(false);
                                }}
                              />
                              <Tab
                                label="Items"
                                {...a11yProps(2)}
                                onClick={() => heightChanges()}
                              />
                            </Tabs>
                            <TabPanel
                              value={value}
                              index={0}
                              className="slider-shipping"
                            >
                              <text style={{ fontWeight: "bold" }}>State:</text>{" "}
                              {x.offers.adress.state} <br />
                              <text style={{ fontWeight: "bold" }}>
                                Country:
                              </text>{" "}
                              {x.offers.adress.country}
                              <br />
                              <text style={{ fontWeight: "bold" }}>
                                City:
                              </text>{" "}
                              {x.offers.adress.city}
                              <br />
                              <text style={{ fontWeight: "bold" }}>
                                Code:
                              </text>{" "}
                              {x.offers.adress.code}
                              <br />
                              <text style={{ fontWeight: "bold" }}>
                                Phone Number:
                              </text>{" "}
                              {x.offers.adress.phoneNumber}
                            </TabPanel>
                            <TabPanel value={value} index={1} className="total">
                              {x.offers.subtotal}$
                            </TabPanel>
                            {active ? (
                              <TabPanel
                                value={value}
                                index={2}
                                className="slider"
                              >
                                <Slider {...settings}>
                                  {x.offers.items.map((x) => (
                                    <div>
                                      <OfferByItemCard params={x} />
                                    </div>
                                  ))}
                                </Slider>
                              </TabPanel>
                            ) : (
                              ""
                            )}
                          </Box>
                        ) : (
                          /* END Items with shipping */
                          /* Items without shipping */
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
                              <Tab
                                label="Total"
                                {...a11yProps(0)}
                                onClick={() => {
                                  setHeight(200);
                                  setActive(false);
                                }}
                              />
                              <Tab
                                label="Items"
                                {...a11yProps(1)}
                                onClick={() => heightChanges()}
                              />
                            </Tabs>

                            <TabPanel value={value} index={0} className="total">
                              {x.offers.subtotal}$
                            </TabPanel>
                            {active ? (
                              <TabPanel
                                value={value}
                                index={1}
                                className="slider"
                              >
                                <Slider {...settings}>
                                  {x.offers.items.map((x) => (
                                    <div>
                                      <OfferByItemCard params={x} />
                                    </div>
                                  ))}
                                </Slider>
                              </TabPanel>
                            ) : (
                              ""
                            )}
                          </Box>
                          /* END Items without shipping */
                        )}
                      </AccordionDetails>
                      {/* END Detailed items in the offer */}
                      {/* Button for the offer */}
                      {x.isSeller ? (
                        <>
                          <div className="container action-offer">
                            <Button variant="contained" color="success">
                              Confirme
                            </Button>
                            <Button
                              variant="outlined"
                              color="warning"
                              onClick={() => setButtonPopup(true)}
                            >
                              Counter Offer
                            </Button>

                            <Button
                              variant="outlined"
                              color="error"
                              onClick={(e) => rejecttheOffer(e, x.offers._id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={(e) => rejecttheOffer(e, x.offers._id)}
                        >
                          Cancel
                        </Button>
                      )}
                      {/* End Button for the offer */}
                      {/* Begin pop up counter offer */}
                      <CounterOffer
                        trigger={buttonPopup}
                        setTrigger={setButtonPopup}
                      >
                        <Button
                          sx={{ display: "block", mt: 2 }}
                          onClick={handleOpen}
                        >
                          Choose Item to modify
                        </Button>
                        {/* Update items for the offer */}
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="demo-controlled-open-select-label">
                            Your Items
                          </InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={items}
                            label="Your Items"
                            onChange={handleChangeoffer}
                          >
                            <MenuItem
                              value=""
                              onClick={() => setActiveitem(false)}
                            >
                              <em>None</em>
                            </MenuItem>
                            {x.offers.items.map((xx) => (
                              <MenuItem
                                value={xx._id}
                                onClick={() => {
                                  setActiveitem(true);
                                  setSelecteditem(xx);
                                  setSelectedoffer(x.offers);
                                }}
                              >
                                {xx.title}
                              </MenuItem>
                            ))}
                          </Select>
                          {/* Update selected items for the offer */}
                          {activeitem && (
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              <div className="selecteditem">
                                {/* Price */}
                                <FormControl sx={{ m: 0.5 }} variant="standard">
                                  <InputLabel htmlFor="standard-adornment-amount">
                                    Amount
                                  </InputLabel>
                                  <Input
                                    id="standard-adornment-amount"
                                    value={valueco.price}
                                    onChange={handleChangeamount("price")}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                                {/* Quantity */}
                                <TextField
                                  label="Quantity"
                                  id="standard-start-adornment"
                                  sx={{ m: 1, width: "25ch" }}
                                  value={valueco.quantity}
                                  onChange={handleChangequantity("quantity")}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        Tonne
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="standard"
                                />
                                {/* Total */}
                                <FormControl sx={{ m: 0.5 }} variant="standard">
                                  <InputLabel htmlFor="standard-adornment-amount">
                                    Total
                                  </InputLabel>
                                  <Input
                                    id="standard-adornment-amount"
                                    value={localStorage.getItem("newvalue")}
                                    onChange={totalLabelFormat(valueco)}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                                {/* Button Update item */}
                                <Button
                                  variant="outlined"
                                  color="warning"
                                  onClick={(e) => {
                                    updateitem(e);
                                  }}
                                >
                                  Update Item
                                </Button>
                              </div>
                            </Box>
                          )}
                          {/* END Update items for the offer */}
                        </FormControl>
                      </CounterOffer>
                      {/* END pop up Counter offer */}
                    </Accordion>
                    {/* END Detailed Offer in the messages  */}
                  </>
                ))}
              {/* Chat messages */}
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
              {/* End of chat messages */}
            </>
          )}
        </article>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Messages;
