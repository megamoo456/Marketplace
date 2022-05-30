import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown } from 'react-bootstrap';
import { getOfferTran } from '../services/productData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css'
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';
import OfferByItemCard from '../components/OfferCard/OfferByItemCard';
import OfferCard from '../components/OfferCard/OfferCard';


function Transport({ match }) {
  let currentOffers = match.params.offers;
  const [offers, setOffers] = useState([])
  const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('oldest');

    const handleSearch = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }
    useEffect(() => {
      setPage(1);
      setLoading(true);
      setQuery("")
      getOfferTran(1, currentOffers)
          .then(res => {
            console.log(res)
            setOffers(res.offers);
              setLoading(false);
              setPage(page => page + 1);
              setQuery("");
          })
          .catch(err => console.log(err));
  }, [currentOffers, setOffers])

  useEffect(() => {
      setPage(1);
      setLoading(true);
      getOfferTran(2, currentOffers, query)
          .then(res => {
              if (query === "") {
                setOffers(offers => [...offers, ...res.offers]);
              } else {
                setOffers(res.offers)
              }
              setLoading(false);
              setPage(page => page + 1);
          })
          .catch(err => console.log(err));
  }, [query, currentOffers])

  return (
    <>
      <div id="sider2">
                <input className="col-lg-6" type="text" placeholder="Search..." name="search" value={query} onChange={handleSearch} />
     </div>
     <CategoriesNav title={"Carry"}/>
     <div className="container">
                <Dropdown id="dropdown-sort">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Sort <BiSort />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setSort('oldest') }}>Oldest <BiDownArrowAlt /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('newest') }}>Newest <BiUpArrowAlt /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('lowerPrice') }}>Price <BiSortDown /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('biggerPrice') }}>Price <BiSortUp /> </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {!loading ?
                    <InfiniteScroll
                        dataLength={offers.length}
                        next={() => {
                            if (query === "") {
                              getOfferTran(page, currentOffers)
                                    .then(res => {
                                      setOffers([...offers, ...res.offers]);
                                        setPage(page + 1)
                                    })
                            }
                        }}
                        hasMore={() => {
                            if (offers.length > 0) {
                                return true
                            }
                            return false
                        }}
                        className="row infinitescroll">
                        {offers
                        
                            .map(x =>
                                <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                    <OfferCard params={x} item={x} />
                                </Col>
                            )}
                    </InfiniteScroll>
                    : <div className="spinner">
                        <Spinner animation="border" />
                    </div>
                }
            </div>
    </>
  )
}

export default Transport
