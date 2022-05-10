import { Card  } from 'react-bootstrap';
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './OfferCard.css'

function OfferByItemCard({ params }) {
    return (
        <Card>
            <Card.Header>      
                    <Card.Img variant="top" src={params.image} />
                  
            </Card.Header>
                <Card.Body> 
                    <Card.Title>{params.title}</Card.Title>
                    <small className="text-muted">  
                    <Card.Text>Category : {params.category}</Card.Text>
                    <Card.Text>Description : {params.description}</Card.Text>
                    <Card.Text>Price Total : {params.itemTotal}</Card.Text></small>
                </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                     <Card.Subtitle><text style={{fontWeight: "bold"}}>Price per Unit :</text>{params.price}€</Card.Subtitle>
                    <Card.Subtitle><text style={{fontWeight: "bold"}}>Quantity :</text>{params.quantity}</Card.Subtitle>

                    {/* <Link to="" id="heartIcon"><BsHeart /></Link> */}
                </small>
            </Card.Footer>
        </Card>

    )
}

export default OfferByItemCard;