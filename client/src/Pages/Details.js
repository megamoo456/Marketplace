import { useEffect, useState , useRef} from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb'
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
import Aside from '../components/Details/Aside/Aside';
import { getSpecific } from '../services/productData'

import '../components/Details/ProductInfo/ProductInfo.css';
import '../components/Details/Aside/Aside.css';

function Details({ match, history }) {
    let productId = match.params.id;
    let [product, setProduct] = useState([])
    let [loading, setLoading] = useState(true);
    const componentMounted = useRef(true); // (3) component is mounted
    useEffect(() => {
        window.scrollTo(0, 0)
        getSpecific(productId)
            .then(res => {
                if (componentMounted.current){ // (5) is component still mounted?
                    setProduct(res); // (1) write data to state
                     setLoading(false); //// (2) write some value to state
                }
                componentMounted.current = false; // (4) set it to false when we leave the page
                })
            .catch(err => console.log(err));
            
    }, [productId, setProduct, setLoading])
    
    return (
        <>
            <SimpleSider />
            <div className="container">
                {!loading ? (
                    <>
                    <Breadcrumb params={product} />
                    <Row>
                        <Col lg={8} id="detailsProduct">
                            <ProductInfo params={product} />
                        </Col>
                        <Col lg={4}>
                            <Aside params={product} history={history} />
                        </Col>
                    </Row></>) : (<Spinner animation="border" />)}
            </div>
        </>
    )
}

export default Details;