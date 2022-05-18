import React, { useEffect, useState , useContext } from "react";
import { Button, Card } from 'react-bootstrap';
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteOffer } from '../../services/messagesData';
import { DeletedAlerts }   from '../Alert/DescriptionAlerts'
import { Context } from "../../ContextStore";
   /*  Notifation Section */
   import { ToastContainer, toast } from 'react-toastify';
   import 'react-toastify/dist/ReactToastify.css';
         /*  End  Notifation Section */

function OfferCard({ params }) {

    const [AlertPopup, setAlertPopup] = useState(false);
    function deletetheoffer(e, id,owner,seller) {
        e.preventDefault();
        deleteOffer(id, owner,seller)
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

    return (
        <>
        <Card>
            <Card.Header style={{height:80}}>      
                    <Card.Title><text style={{fontWeight: "bold"}}>Shipping:</text>{(params.adress.shipping).toString().toUpperCase()}</Card.Title>
                    {params.adress.shipping &&
                    <small className="text-muted">
                        {params.adress.state}/  
                        {params.adress.city}/
                        {params.adress.code}</small>}
            </Card.Header>
                <Card.Body> {params.items          
                               .map(x =>
                    <Card.Title  key={x._id.toString()}>{x.title.toUpperCase()}</Card.Title>)
                    }
                    <Card.Text>{params.subtotal}€</Card.Text>
                    
                </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    <Moment format="d MMM YYYY (dddd) HH:mm">
                        {params.addedAt} 
                    </Moment> 
                    {params.statue == 'Pending' || params.statue ==  'Confirmed' ? (
                    <Card.Text style={params.statue == 'Pending' ? { color: 'orange'}  : { color: 'green'}}>
                        {params.statue}</Card.Text>  ): 
                        (<Button variant="danger" onClick={(e)=> deletetheoffer(e,params._id,params.owner,params.seller)}>
                        {params.statue}</Button>) }
                    {/* <Link to="" id="heartIcon"><BsHeart /></Link> */}
                </small>
            </Card.Footer>
            
        </Card>
            <DeletedAlerts trigger={AlertPopup} setTrigger={setAlertPopup} />
        </>
    )
}

export default OfferCard;