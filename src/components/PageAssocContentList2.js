import React from "react";
import { Link } from "react-router-dom";

const PageAssocContentList2 = props => (
  <div className="post">
    <Link to={"/article/" + props.articleId.replace("AVIArticle:", "")}>
      <img
        className="photo left"
        src={props.pageAttributes[props.articleImageId].imageFile_bloblink_}
        alt=""
        width="135"
        height="90"
      ></img>
    </Link>
    <div className="descr left">
      <h3 className="title">
        <Link to={"/article/" + props.articleId.replace("AVIArticle:", "")}>
          {props.pageAttributes[props.articleId].headline}
        </Link>
      </h3>
      {props.pageAttributes[props.articleId].abstract}
    </div>
  </div>
);
export default PageAssocContentList2;
