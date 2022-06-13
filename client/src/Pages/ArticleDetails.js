import { useEffect, useState, useRef } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import SimpleSider from "../components/Siders/SimpleSider";
import Breadcrumb from "../components/Details/BreadcrumbArt";
import ProductInfo from "../components/Details/ProductInfo/ProductInfo";
import Aside from "../components/Details/Aside/Aside";

import BlogBanner from "../components/BlogBanner/BlogBanner";
import "../components/Details/ProductInfo/ProductInfo.css";
import "../components/Details/Aside/Aside.css";
import { getSpecificArt } from "../services/blogData";
import ArticleInfo from "../components/Details/ArticleInfo/ArticleInfo";

function ArticleDetails({ match, history }) {
  let articleId = match.params.id;
  let [article, setArticle] = useState([]);
  let [loading, setLoading] = useState(true);
  const componentMounted = useRef(true); // (3) component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
    getSpecificArt(articleId)
      .then((res) => {
        if (componentMounted.current) {
          // (5) is component still mounted?
          setArticle(res); // (1) write data to state
          setLoading(false); //// (2) write some value to state
        }
        componentMounted.current = false; // (4) set it to false when we leave the page
      })
      .catch((err) => console.log(err));
  }, [articleId, setArticle, setLoading]);

  return (
    <>
      <BlogBanner />
      <div className="container">
        {!loading ? (
          <>
            <Breadcrumb params={article} />
            <Row>
              <Col lg={12} id="detailsProduct">
              <ArticleInfo params={article} />
              </Col>
            </Row>
          </>
        ) : (
          <Spinner animation="border" />
        )}
      </div>
    </>
  );
}

export default ArticleDetails;
