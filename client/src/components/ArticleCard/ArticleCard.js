import React from "react";
import "./ArticleCard.css";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userData";
import { getBlogById } from "../../services/blogData";
import { faComment } from '@fortawesome/free-solid-svg-icons'



function ArticleCard({ params }) {
  const [user, setUser] = useState({});
  const [blog, setBlog] = useState({});

  var style = { 
    backgroundImage: 'url(' + params.image + ')',
};
useEffect(()=> {
  getBlogById(params.id)
  .then((res)=>{
    setBlog(res)
  })
  .catch((err) => console.log(err));

  getUserById(params.articleowner)
  .then((res)=>{
    setUser(res.user)
  })
  .catch((err) => console.log(err));
},[])
  return (
    
      <div className="example-2 card" id="artcardF">
        <div className="wrapper" style={style} id="artwrapperF" >
          <div className="header">
            <div className="date">
              <span className="day">{params.addedAt}</span>
            </div>
            <ul className="menu-content">
              <li>
                <a href="#" id="a">
              <span> <FontAwesomeIcon icon={faComment} beat />{params.comments.length}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="data">
            <div className="content">
              <span className="author">{user.name}</span>
              <h1 className="title">
                <a href="#">{params.title}</a>
              </h1>
              <a href={`/blog/${blog.title}/${params.id}/details`} className="button">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
      
  );
}

export default ArticleCard;
