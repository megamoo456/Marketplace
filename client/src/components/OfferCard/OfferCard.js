import React, { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteOffer, offertransport } from "../../services/messagesData";
import { DeletedAlerts } from "../Alert/DescriptionAlerts";
import { getUser, getUserRole, getOwnerParams } from "../../services/userData";

import { Context } from "../../ContextStore";
/*  Notifation Section */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*  End  Notifation Section */

function OfferCard({ params }) {
  const [roles, setRoles] = useState([]);
  const [iuser, setIuser] = useState({});
  const [owner, setOwner] = useState({});
  const [group, setGroup] = useState({});

  useEffect(() => {
    let group = params.items.reduce((r, a) => {
      r[a.name] = [...(r[a.name] || []), a];
      return r;
    }, {});
    setGroup(group);

    console.log(group);
  }, [params.items]);
  useEffect(() => {
    getUser()
      .then((x) => {
        setIuser(x.user._id);
        getUserRole(x.user._id)
          .then((res) => {
            console.log(res.toString());
            setRoles(res[0].toString());
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
      getOwnerParams(params.owner)
      .then((xx) => {
        setOwner(xx);
      })
      .catch((err) => console.log(err));
    return setRoles([]);
  }, []);

  const [AlertPopup, setAlertPopup] = useState(false);
  function deletetheoffer(e, id, owner, seller) {
    e.preventDefault();
    deleteOffer(id, owner, seller)
      .then((res) => {
        console.log(res);
        toast.success(`Offer is Deleted Successfuly !`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => console.log(err));
  }
  function transporttheoffer(e, id) {
    e.preventDefault();
    offertransport(id)
      .then((res) => {
        console.log(res);
        toast.success(`Offer is Taken Successfuly !`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Card>
        <Card.Header style={{ height: 80 }}>
        {iuser === params.owner.toString() ? 
          <Card.Title>
                 <text style={{ fontWeight: "bold" }}>Buy</text>
          </Card.Title>
         :iuser === params.seller.toString() ?
            <Card.Title>
            <text style={{ fontWeight: "bold" }}>Sell</text>
        </Card.Title>
          :(
            <Card.Title>
            <text style={{ fontWeight: "bold" }}>Tranporter</text>
        </Card.Title>
          )}
 
          {params.adress.shipping && (
            <small className="text-muted" style={{ whiteSpace:"nowrap" }}>
             Shipping To --
              {params.adress.state}/{params.adress.city}/{params.adress.code}
            </small>
          )}
        </Card.Header>
        <Card.Body>
          {" "}
          {params.items.map((x) => (
            <Card.Title key={x._id.toString()}>
              {x.title.toUpperCase()} ({x.quantity}Tonne)
            </Card.Title>
          ))}
          {iuser === params.owner.toString() ? 
            <>
              <Card.Text>
                <text style={{ fontWeight: "normal" }}>
                  Name of the seller :
                </text>
                {Object.keys(group)}
              </Card.Text>
              <Card.Text>
                <text style={{ fontWeight: "normal" }}>phoneNumber :</text>
                {params.adress.phoneNumber}
              </Card.Text>
              </>
           : iuser === params.seller.toString()  ?
              <>
                <Card.Text>
                  <text style={{ fontWeight: "normal" }}>
                    Name of the Buyer :
                  </text>
                  {owner.name}
                </Card.Text>
                <Card.Text>
                  <text style={{ fontWeight: "normal" }}>phoneNumber :</text>
                  {owner.phoneNumber}
                </Card.Text>
                </>
            : ( <>
            <Card.Text>
              <text style={{ fontWeight: "normal" }}>
                Name of the Buyer :
              </text>
              {owner.name}
            </Card.Text>
            <Card.Text>
                  <text style={{ fontWeight: "normal" }}>Buyer phoneNumber :</text>
                  {owner.phoneNumber}
                </Card.Text>
             <Card.Text>
             <text style={{ fontWeight: "normal" }}>
               Name of the seller :
             </text>
             {Object.keys(group)}
           </Card.Text>
           <Card.Text>
                <text style={{ fontWeight: "normal" }}>Seller phoneNumber :</text>
                {params.adress.phoneNumber}
              </Card.Text>
           </>)
          }
          <Card.Text>
            <text style={{ fontWeight: "normal" }}>Subtotal :</text>
            {params.subtotal}€
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            <Moment format="d MMM YYYY (dddd) HH:mm">{params.addedAt}</Moment>
            {params.statue == "Pending" ||
            params.statue == "Confirmed" ||
            params.statue == "On the way" ? (
              <Card.Text
                style={
                  params.statue == "Pending"
                    ? { color: "orange" }
                    : { color: "green" }
                }
              >
                {params.statue}
              </Card.Text>
            ) : (
              <Button
                variant="danger"
                onClick={(e) =>
                  deletetheoffer(e, params._id, params.owner, params.seller)
                }
              >
                {params.statue}
              </Button>
            )}
            {roles === "canTransporter" && params.statue == "Confirmed" ? (
              <Button
                variant="success"
                onClick={(e) => transporttheoffer(e, params._id)}
              >
                Confirm Transportation
              </Button>
            ) : (
              ""
            )}

            {/* <Link to="" id="heartIcon"><BsHeart /></Link> */}
          </small>
        </Card.Footer>
      </Card>
      <DeletedAlerts trigger={AlertPopup} setTrigger={setAlertPopup} />
    </>
  );
}

export default OfferCard;
