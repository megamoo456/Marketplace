import { Card } from 'react-bootstrap';
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function OfferCard({ params }) {
    return (
        <Card>
            <Card.Header>      
                    <Card.Title>Shipping:{(params.adress.shipping).toString()}</Card.Title>
                    {params.adress.shipping &&
                    <small className="text-muted">
                        {params.adress.state}/  
                        {params.adress.city}/
                        {params.adress.code}</small>}
            </Card.Header>
                <Card.Body> {params.items          
                               .map(x =>
                    <Card.Title  key={x._id.toString()}>{x.title}</Card.Title>)
                    }
                    <Card.Text>{params.subtotal}€</Card.Text>
                </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    <Moment format="d MMM YYYY (dddd) HH:mm">
                        {params.addedAt}
                    </Moment>

                    {/* <Link to="" id="heartIcon"><BsHeart /></Link> */}
                </small>
            </Card.Footer>
        </Card>
    )
}

export default OfferCard;