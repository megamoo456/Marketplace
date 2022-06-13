import { getBlogById } from "../../services/blogData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from 'react-bootstrap';
import { Style } from "@mui/icons-material";

function BreadcrumbNavArt({ params }) {
    const [blog, setBlog] = useState({});
  var style = {marginTop: "15px"};
    useEffect(()=> {
        getBlogById(params.id)
        .then((res)=>{
            console.log(res)
          setBlog(res)
        })
        .catch((err) => console.log(err));
     
      },[])
    return (
        <Breadcrumb style={style}>
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to={`/blog/${blog.title}`}>{blog.title}</Link>
            </li>
            <li  className="breadcrumb-item">
                <Link to={`/blog/${blog.title}/${params.id}/details`}>{params.title}</Link>
            </li>
        </Breadcrumb>
    )
}

export default BreadcrumbNavArt;