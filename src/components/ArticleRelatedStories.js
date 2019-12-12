import React from "react";
import { Link } from "react-router-dom";

const ArticleRelatedStories = props => (
  <div className="highlight">
    <Link to={"/article/" + props.articleId.replace("AVIArticle:", "")}>
      <img
        className="photo left"
        src={props.articleAttributes[props.articleImageId].imageFile_bloblink_}
        alt=""
        width="239"
        height="170"
      ></img>
    </Link>
    <div className="descr">
      <h3 className="title">
        <Link to={"/article/" + props.articleId.replace("AVIArticle:", "")}>
          {props.articleAttributes[props.articleId].headline}
        </Link>
      </h3>
      {props.articleAttributes[props.articleId].abstract}
    </div>
  </div>
);
export default ArticleRelatedStories;
