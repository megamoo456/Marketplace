import { useEffect, useState  } from 'react';
import OfferCard from '../../OfferCard/OfferCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserOfferlist } from '../../../services/userData';
import { Context } from "../../../ContextStore";

import '../Wishlist/Wishlist.css';
function Offers() {
    const [offers, setOffers] = useState([])
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserOfferlist()
            .then(res => {console.log(res)
                setOffers(res.yourOffers);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [setOffers, setLoading])

    return (
        <>
            {!loading ?
                (<>
                    <h1 className="heading">Your Offers</h1>
                    {offers.length > 0 ? (
                        <Row>
                            {offers
                               
                                .map(x =>
                                    <Col xs={12} md={6} lg={4} key={x._id.toString()}>
                                        <OfferCard params={x} />
                                    </Col>
                                )
                            }
                        </Row>
                    ) : (
                            <p className="nothing-to-show">Nothing to show</p>
                        )}

                </>) :
                <Spinner animation="border" />}

        </>
    )
}

export default Offers
