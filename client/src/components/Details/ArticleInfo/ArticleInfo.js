import React from "react";
import {
  Row,
  Tabs,
  Tab,
  Image,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import parse from "html-react-parser";
import { Badge } from '@mui/material';
import "./ArticleInfo.css";

function ArticleInfo({ params }) {
  const htmlString = params.description;

  return (
    <>
      <h1 className="col-lg-10 col-sm-10 product-info-heading">
        {params.title}
      </h1>
      <Image className="col-lg-12" src={params.image} rounded />
      <div className="container">
      &nbsp; &nbsp;
      {params.tags.map((x)=><>
         <span className="badge">{x}</span>&nbsp; &nbsp; </>
         )} 
        <div>{parse(htmlString)}</div>
        &nbsp; &nbsp;
       
         </div>
    </>
  );
}

export default ArticleInfo;
