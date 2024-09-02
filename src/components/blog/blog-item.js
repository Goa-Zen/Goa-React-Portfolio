import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";

import ProfileImageSwift from "../../../static/assets/images/mypictures/profile-white-very-small-swift.jpg";

const BlogItem = props => {
  const {
    id,
    blog_status,
    content,
    title,
    featured_image_url
  } = props.blogItem;

  return (
    <div className="blog-item-wrapper">
      <div className="blog-item-head">
        <div className="image-wrapper" >
          <img src={ featured_image_url !== null ? featured_image_url : ProfileImageSwift} />
        </div>
        <div>
          <Link to={`/b/${id}`}>
          <h1>{title}</h1>
        </Link>
        </div>
      </div>
      <div className="blog-item-content">
        <Truncate
          lines={5}
          ellipsis={
            <span>
              ...<Link to={`/b/${id}`}>Read more</Link>
            </span>
          }
        >
          {striptags(content)}
        </Truncate>
      </div>
    </div>
  );
};

export default BlogItem;